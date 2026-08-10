const express = require("express");
const router = express.Router();
const paymentController = require("../../../controller/userapp/v1/paymentController");
const {PLATFORM} = require("../../../constants/authConstant");
const auth = require("../../../middleware/auth");

// Razorpay Payment APIs
router.post('/razorpay/create', auth(PLATFORM.USERAPP), paymentController.createRazorpayPayment);
router.post('/razorpay/verify', auth(PLATFORM.USERAPP), paymentController.verifyRazorpayPayment);
router.get('/razorpay/get/:id', auth(PLATFORM.USERAPP), paymentController.getPaymentById);
router.get('/razorpay/user/:userId', auth(PLATFORM.USERAPP), paymentController.getPaymentsByUserId);

// Existing CRUD Payment APIs
router.post('/create', auth(PLATFORM.USERAPP), paymentController.addPayment);
router.get('/get/:id', auth(PLATFORM.USERAPP), paymentController.getPayment);


module.exports = router;
