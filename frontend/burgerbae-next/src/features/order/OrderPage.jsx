"use client";
import React from "react";
import { useState, useEffect } from "react";
import OrderStepper from "./components/OrderStepper";
import { useParams } from "next/navigation";
import { OrderAPI } from "@/mocks/OrderApi";
import Image from "next/image";

function OrderPage() {
  const { orderId, productId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);

  const getOrderDetails = async (orderId, productId) => {
    try {
      // Use listOrder since getOrder doesn't exist in mocks, fetch by order id
      let result =
        typeof OrderAPI.getOrder === "function"
          ? await OrderAPI.getOrder(orderId)
          : await OrderAPI.listOrder(1, 50, { id: orderId }); // Fetch with larger limit in case query fails

      if (result?.status === "SUCCESS" || result?.data?.status === "SUCCESS") {
        console.log("Successfully ! , order details retrieved....");

        // Handle both possible structures from listOrder or getOrder
        const dataArr = result.data?.data || result.data || result;

        let orderData;
        if (Array.isArray(dataArr)) {
          // Find the specific order in the array
          orderData = dataArr.find(
            (o) =>
              String(o?.id) === String(orderId) ||
              String(o?._id) === String(orderId),
          );
          if (!orderData && dataArr.length > 0) {
            console.log(
              "Order not found directly by id, trying to fetch anyway...",
              dataArr,
            );
            orderData = dataArr[0]; // Fallback
          }
        } else {
          orderData = dataArr;
        }

        console.log("Matched OrderData:", orderData);
        setOrderDetails(orderData);

        // Filter out the product whose productid is in params
        if (orderData?.products && orderData.products.length > 0) {
          console.log("Order products:", orderData.products);
          const product = orderData.products.find(
            (p) =>
              String(p._id) === String(productId) ||
              String(p.productId?._id) === String(productId) ||
              String(p.id) === String(productId),
          );
          console.log("Matched Single Product:", product);
          setSingleProduct(product);
        } else {
          console.log("Order has no products array!");
        }

        return orderData;
      } else {
        setOrderDetails(null);
        setSingleProduct(null);
        console.log("issue in fetching order data....");
      }
    } catch (error) {
      console.log("error in fetching order list", error);
    }
  };

  useEffect(() => {
    if (orderId && productId) {
      getOrderDetails(orderId, productId);
    }
  }, [orderId, productId]);

  console.log("singleProduct", singleProduct);

  return (
    <div className="mt-[100px] flex flex-wrap justify-center items-start gap-10 p-5">
      <div className="border p-6 rounded-md shadow-sm w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <Image
            src = {singleProduct?.productId?.image}
            alt={singleProduct?.productId?.title?.longTitle || "Product Img"}
            className="w-48 h-48 object-contain"
            width={500}
            height={500}
          />
        </div>
        <div className="text-center mt-4">
          <p className="font-semibold text-lg">
            {singleProduct?.productId?.title?.longTitle}
          </p>
          <p className="text-gray-700 mt-2 font-medium">
            ₹{singleProduct?.productId?.price?.cost * singleProduct?.qty}
          </p>
          <p className="text-sm capitalize text-gray-500 mt-1">
            Status: {orderDetails?.status || "Pending"}
          </p>
          <p className="text-sm capitalize text-gray-500 mt-1">
            Payment Status: {orderDetails?.paymentStatus || "Pending"}
          </p>
        </div>

        <p className="text-xs text-red-500 mt-6 text-center">
          Order not delivered yet. Only cancellation available.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-lg">
        <div className="border p-6 rounded-md shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Track Order</h3>
          <OrderStepper steps={[1, 2, 3, 4, 5, 6]} currentStep={1} />
        </div>

        <div className="border p-6 rounded-md shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Shipping address</h3>
          <div className="text-gray-600 text-sm flex flex-col gap-1">
            <p className="font-medium text-black">
              {orderDetails?.address?.fullname ||
                orderDetails?.address?.name ||
                "N/A"}
            </p>

            <p>{orderDetails?.address?.email}</p>
            <p>
              {orderDetails?.address?.street ||
                orderDetails?.address?.addressLine1 ||
                ""}
            </p>
            <p>
              {orderDetails?.address?.city
                ? `${orderDetails.address.city}, `
                : ""}
              {orderDetails?.address?.state
                ? `${orderDetails.address.state} `
                : ""}
              {orderDetails?.address?.zipcode
                ? `- ${orderDetails.address.zipcode}`
                : ""}
            </p>
            <p className="mt-2">Phone: {orderDetails?.address?.tel || "N/A"}</p>
          </div>
        </div>

        <div className="border p-6 rounded-md shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Price Details</h3>
          <div className="flex flex-col gap-3 text-gray-600 text-sm">
            <p className="flex justify-between">
              <span>List Price:</span>
              <span>
                ₹
                {singleProduct?.productId?.price?.mrp * singleProduct?.qty || 0}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Selling Price:</span>
              <span>
                ₹
                {singleProduct?.productId?.price?.cost * singleProduct?.qty ||
                  0}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Discount:</span>
              <span className="text-green-600">
                -
                {singleProduct?.productId?.price?.discount *
                  singleProduct?.qty || 0}
              </span>
            </p>
            <div className="border-t mt-2 pt-3">
              <p className="flex justify-between font-bold text-black text-base">
                <span>Total Amount:</span>
                <span>
                  ₹
                  {singleProduct?.productId?.price?.cost * singleProduct?.qty ||
                    0}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
