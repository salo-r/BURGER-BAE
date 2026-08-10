/**
 * PaymentController.js
 * @description : exports action methods for Payment with Razorpay integration.
 */

const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../../../model/payment");
const Transaction = require("../../../model/transaction");
const paymentSchemaKey = require("../../../utils/validation/paymentValidation");
const validation = require("../../../utils/validateRequest");
const dbService = require("../../../utils/dbServices");
const ObjectId = require("mongodb").ObjectId;
const utils = require("../../../utils/comon");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ========================
// RAZORPAY PAYMENT APIs
// ========================

/**
 * @description : Create a Razorpay order and initiate payment.
 * @param {Object} req : request including body with amount, orderId, paymentMode, currency.
 * @param {Object} res : response with razorpay order details.
 * @return {Object} : created Razorpay order. {status, message, data}
 */
const createRazorpayPayment = async (req, res) => {
  try {
    const user = req.user;
    const postData = req.body;

    if (!user || !user.id) {
      return res.unAuthorized({ message: "Unauthorized access" });
    }
    if (!postData.amount || postData.amount <= 0) {
      return res.badRequest({ message: "Invalid payment amount" });
    }
    if (!postData.orderId) {
      return res.badRequest({ message: "Missing required orderId" });
    }

    // Create Razorpay order
    const options = {
      amount: postData.amount * 100, // amount in paise
      currency: postData.currency || "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create(options);
    } catch (err) {
      console.error("Razorpay order creation error:", err);
      return res.internalServerError({ message: "Payment initiation failed" });
    }

    if (!razorpayOrder) {
      return res.internalServerError({ message: "Payment initiation failed" });
    }

    // Create Transaction record
    let transactionRecord;
    try {
      transactionRecord = await dbService.create(Transaction, {
        userId: user.id,
        orderId: postData.orderId,
        paymentType: postData.paymentMode || "card",
        paymentFor: "Order",
        paymentBy: postData.paymentMode || "card",
        chargeStatus: razorpayOrder.status || "created",
      });
    } catch (err) {
      console.error("Transaction creation error:", err);
      return res.internalServerError({
        message: "Failed to save transaction record",
      });
    }

    // Create Payment record
    let paymentRecord;
    try {
      paymentRecord = await dbService.create(Payment, {
        userId: user.id,
        orderId: postData.orderId,
        razorpayOrderId: razorpayOrder.id,
        amount: postData.amount,
        currency: razorpayOrder.currency,
        paymentMode: postData.paymentMode,
        paymentStatus: razorpayOrder.status || "created",
        addedBy: user.id,
      });
    } catch (err) {
      console.error("Payment creation error:", err);
      return res.internalServerError({
        message: "Failed to save payment record",
      });
    }

    return res.success({
      data: {
        msg: "Payment initiated successfully",
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: razorpayOrder.status,
        amount: postData.amount,
        currency: razorpayOrder.currency,
        paymentRecordId: paymentRecord.id || paymentRecord._id,
        transactionId: transactionRecord.id || transactionRecord._id,
        key_id: process.env.RAZORPAY_KEY_ID, // frontend needs this to open Razorpay checkout
      },
    });
  } catch (error) {
    console.error("createRazorpayPayment error:", error);
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : Verify Razorpay payment signature and update payment/transaction status.
 * @param {Object} req : request including body with razorpay_order_id, razorpay_payment_id, razorpay_signature.
 * @param {Object} res : response with verification result.
 * @return {Object} : verification status. {status, message, data}
 */
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id) {
           return res.badRequest({ message: "Missing razorpay_order_id" });

    }
    // If payment_id is missing, payment was cancelled/failed
    if (!razorpay_payment_id) {
      // Update Payment status to failed
      let failedPayment = await dbService.updateOne(
        Payment,
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "failed" },
      );

      // Update Transaction status to failed
      if (failedPayment && failedPayment.orderId) {
        await dbService.updateOne(
          Transaction,
          { orderId: failedPayment.orderId },
          { chargeStatus: "failed", capturedAt: new Date() },
        );
      }

    return res.success({
      data: {
          msg: "Payment was cancelled or failed",
          payment: failedPayment,
          status: "failed",
        },
      });

    }

    // Verify signature for successful payments
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      // Signature verification failed - mark as failed
      let failedPayment = await dbService.updateOne(
        Payment,
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "failed" },
      );

      if (failedPayment && failedPayment.orderId) {
        await dbService.updateOne(
          Transaction,
          { orderId: failedPayment.orderId },
          { chargeStatus: "failed" },
        );
      }

    return res.badRequest({
        message: "Payment signature verification failed",
        data: failedPayment,
        status: "failed",
      });

    }

    // Payment is successful - update status to captured
    let updatedPayment = await dbService.updateOne(
      Payment,
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: "captured",
      },
    );

    if (updatedPayment && updatedPayment.orderId) {
      await dbService.updateOne(
        Transaction,
        { orderId: updatedPayment.orderId },
        {
          chargeStatus: "captured",
          capturedAt: new Date(),
        },
      );
    }

      return res.success({
      data: {
        msg: "Payment verified successfully",
        payment: updatedPayment,
        status: "captured",
      },
    });
  }
   catch (error) {
    console.error("Payment verification error:", error);
    return res.internalServerError({ message: "Payment verification failed" });

  }
};

/**
 * @description : Get payment details by payment record ID.
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains payment document.
 * @return {Object} : found Payment. {status, message, data}
 */
const getPaymentById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message: "Invalid payment ID" });
    }
    let query = { _id: req.params.id };
    let foundPayment = await dbService.findOne(Payment, query);
    if (!foundPayment) {
      return res.recordNotFound();
    }
    return res.success({ data: foundPayment });
  } catch (error) {
    console.error("Error fetching payment:", error);
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : Get all payments for a specific user.
 * @param {Object} req : request including userId in request params.
 * @param {Object} res : response contains list of payment documents.
 * @return {Object} : found Payments. {status, message, data}
 */
const getPaymentsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId || !ObjectId.isValid(userId)) {
      return res.validationError({ message: "Invalid user ID" });
    }

    let payments = await dbService.findMany(Payment, { userId: userId });
    if (!payments || payments.length === 0) {
      return res.recordNotFound({ message: "No payments found for this user" });
    }
    return res.success({ data: payments });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return res.internalServerError({ message: error.message });
  }
};

// ========================
// EXISTING CRUD PAYMENT APIs
// ========================

/**
 * @description : create document of Payment in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Payment. {status, message, data}
 */
const addPayment = async (req, res) => {
  try {
    let dataToCreate = { ...(req.body || {}) };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      paymentSchemaKey.schemaKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Payment(dataToCreate);
    let createdPayment = await dbService.create(Payment, dataToCreate);
    return res.success({ data: createdPayment });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : create multiple documents of Payment in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Payments. {status, message, data}
 */
const bulkInsertPayment = async (req, res) => {
  try {
    if (
      req.body &&
      (!Array.isArray(req.body.data) || req.body.data.length < 1)
    ) {
      return res.badRequest();
    }
    let dataToCreate = [...req.body.data];
    for (let i = 0; i < dataToCreate.length; i++) {
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id,
      };
    }
    let createdPayments = await dbService.create(Payment, dataToCreate);
    createdPayments = { count: createdPayments ? createdPayments.length : 0 };
    return res.success({ data: { count: createdPayments.count || 0 } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find all documents of Payment from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Payment(s). {status, message, data}
 */
const findAllPayment = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      paymentSchemaKey.findFilterKeys,
      Payment.schema.obj,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === "object" && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly) {
      let totalRecords = await dbService.count(Payment, query);
      return res.success({ data: { totalRecords } });
    }
    if (
      req.body &&
      typeof req.body.options === "object" &&
      req.body.options !== null
    ) {
      options = { ...req.body.options };
    }
    let foundPayments = await dbService.paginate(Payment, query, options);
    if (!foundPayments || !foundPayments.data || !foundPayments.data.length) {
      return res.recordNotFound();
    }
    return res.success({ data: foundPayments });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find document of Payment from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Payment. {status, message, data}
 */
const getPayment = async (req, res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message: "invalid objectId." });
    }
    query._id = req.params.id;
    let options = {};
    let foundPayment = await dbService.findOne(Payment, query, options);
    if (!foundPayment) {
      return res.recordNotFound();
    }
    return res.success({ data: foundPayment });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : returns total number of documents of Payment.
 * @param {Object} req : request including where object to apply filters in req body
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPaymentCount = async (req, res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      paymentSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === "object" && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPayment = await dbService.count(Payment, where);
    return res.success({ data: { count: countedPayment } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update document of Payment with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Payment.
 * @return {Object} : updated Payment. {status, message, data}
 */
const updatePayment = async (req, res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy: req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      paymentSchemaKey.updateSchemaKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }
    const query = { _id: req.params.id };
    let updatedPayment = await dbService.updateOne(
      Payment,
      query,
      dataToUpdate,
    );
    if (!updatedPayment) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedPayment });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update multiple records of Payment with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Payments.
 * @return {Object} : updated Payments. {status, message, data}
 */
const bulkUpdatePayment = async (req, res) => {
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate["addedBy"];
    if (
      req.body &&
      typeof req.body.data === "object" &&
      req.body.data !== null
    ) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy: req.user.id,
      };
    }
    let updatedPayment = await dbService.updateMany(
      Payment,
      filter,
      dataToUpdate,
    );
    if (!updatedPayment) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedPayment } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : deactivate document of Payment from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Payment.
 * @return {Object} : deactivated Payment. {status, message, data}
 */
const softDeletePayment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({
        message: "Insufficient request parameters! id is required.",
      });
    }
    let query = { _id: req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPayment = await dbService.updateOne(Payment, query, updateBody);
    if (!updatedPayment) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedPayment });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete document of Payment from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Payment. {status, message, data}
 */
const deletePayment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({
        message: "Insufficient request parameters! id is required.",
      });
    }
    const query = { _id: req.params.id };
    const deletedPayment = await dbService.deleteOne(Payment, query);
    if (!deletedPayment) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedPayment });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete documents of Payment in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPayment = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id: { $in: ids } };
    const deletedPayment = await dbService.deleteMany(Payment, query);
    if (!deletedPayment) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: deletedPayment } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : deactivate multiple documents of Payment from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Payment.
 * @return {Object} : number of deactivated documents of Payment. {status, message, data}
 */
const softDeleteManyPayment = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id: { $in: ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPayment = await dbService.updateMany(Payment, query, updateBody);
    if (!updatedPayment) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedPayment } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  // Razorpay APIs
  createRazorpayPayment,
  verifyRazorpayPayment,
  getPaymentById,
  getPaymentsByUserId,
  // Existing CRUD APIs
  addPayment,
  bulkInsertPayment,
  findAllPayment,
  getPayment,
  getPaymentCount,
  updatePayment,
  bulkUpdatePayment,
  softDeletePayment,
  deletePayment,
  deleteManyPayment,
  softDeleteManyPayment,
};
