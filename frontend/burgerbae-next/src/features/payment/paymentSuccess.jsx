"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { clearPaymentDetails } from "@/redux/slices/payment";

export default function PaymentSuccess() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const paymentDetails = useSelector((state) => state.payment.paymentDetails);

  //  Local state to preserve data after clearing Redux
  const [localPayment, setLocalPayment] = useState(null);

  // Copy → then clear Redux
  useEffect(() => {
    if (paymentDetails) {
      setLocalPayment(paymentDetails);
      dispatch(clearPaymentDetails());
    }
  }, [paymentDetails, dispatch]);

  const data = localPayment;

  console.log("Final Payment Data:", data);

  //  Build details safely
  const details = data
    ? [
        {
          label: "Amount",
          value: data.amount ? `₹${data.amount}` : "—",
          type: "amount",
        },
        {
          label: "Transaction ID",
          value: data.id || "—",
          type: "badge",
        },
        {
          label: "Payment Method",
          value: data.paymentMode ? data.paymentMode.toUpperCase() : "—",
          type: "bold",
        },
        {
          label: "Date",
          value: data.createdAt
            ? new Date(
                typeof data.createdAt === "number"
                  ? data.createdAt * 1000
                  : data.createdAt,
              )
                .toISOString()
                .split("T")[0]
            : "—",
          type: "default",
        },
      
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-[15px]">
      <div className="bg-white rounded-2xl shadow-md px-10 py-12 w-full max-w-md flex flex-col items-center">
        {/* ✅ Checkmark */}
        <div
          className="rounded-full bg-green-100 flex items-center justify-center mb-6"
          style={{ width: 72, height: 72 }}
        >
          <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="white"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* ✅ Heading */}
        <h1 className="text-2xl font-bold text-green-500 mb-3 tracking-tight">
          Payment Successful!
        </h1>

        {/* ✅ Subtitle */}
        <p className="text-sm text-gray-500 text-center leading-relaxed max-w-xs mb-8">
          Your payment has been processed successfully. You will receive a
          confirmation email shortly.
        </p>

        {/* ✅ Details */}
        <div className="w-full border border-gray-100 rounded-xl overflow-hidden mb-5">
          {details.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-5 py-[15px] ${
                index !== details.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <span className="text-sm text-gray-500">{item.label}</span>

              {item.type === "amount" && (
                <span className="text-lg font-bold text-gray-900">
                  {item.value}
                </span>
              )}

              {item.type === "badge" && (
                <span className="bg-gray-100 border border-gray-200 rounded-md px-2.5 py-0.5 font-mono text-xs text-gray-700 font-medium">
                  {item.value}
                </span>
              )}

              {item.type === "bold" && (
                <span className="text-sm font-bold text-gray-900">
                  {item.value}
                </span>
              )}

              {item.type === "default" && (
                <span className="text-sm font-medium text-gray-900">
                  {item.value}
                </span>
              )}
            </div>
          ))}

          {/* ✅ Fallback */}
          {details.length === 0 && (
            <div className="px-5 py-6 text-center text-sm text-gray-400">
              Payment details not available. Please check your orders.
            </div>
          )}
        </div>

        {/* ✅ Email footer */}
        <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-[14px] flex items-center justify-center gap-2.5 text-gray-500 text-sm">
          <i className="fa-regular fa-envelope text-gray-400 text-sm" />
          {user?.email
            ? `Receipt sent to ${user.email}`
            : "Receipt sent to your registered email"}
        </div>
      </div>
    </div>
  );
}
