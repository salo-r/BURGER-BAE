"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearPaymentDetails } from "@/redux/slices/payment";

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M8 8 L20 20 M20 8 L8 20"
      stroke="#e53535"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 2v5M7 10v1"
      stroke="#555555"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function PaymentUnsuccessful() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(null);

  const paymentDetails = useSelector((state) => state.payment.paymentDetails);

  // ✅ Local copy
  const [localPayment, setLocalPayment] = useState(null);

  // ✅ Copy → clear Redux
  useEffect(() => {
    if (paymentDetails) {
      setLocalPayment(paymentDetails);
      dispatch(clearPaymentDetails());
    }
  }, [paymentDetails, dispatch]);

  const data = localPayment;

  console.log("Final Payment Data:", data);

  const handleAction = (action) => {
    setLoading(action);
    setTimeout(() => setLoading(null), 1500);
  };

  // ✅ Safe formatted date
  const formattedDate = data?.createdAt
    ? new Date(
        typeof data.createdAt === "number"
          ? data.createdAt * 1000
          : data.createdAt
      )
        .toISOString()
        .replace("T", " ")
        .slice(0, 16) // YYYY-MM-DD HH:mm
    : "—";

  const transactionDetails = data
    ? [
        {
          label: "Amount",
          value: data.amount ? `₹${data.amount}` : "—",
          bold: true,
        },
        {
          label: "Payment Method",
          value: data.paymentMode
            ? data.paymentMode.toUpperCase()
            : "—",
        },
        {
          label: "Date & time",
          value: formattedDate,
        },
      ]
    : [];

  return (
    <div className="flex flex-col items-center justify-start  px-4 py-8 bg-gray-100 font-sans mt-[80px]">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col items-center px-6 pt-8 pb-6 border-b border-gray-100 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
            <XIcon />
          </div>
          <p className="text-lg font-medium text-gray-900 mb-1">
            Payment unsuccessful
          </p>
          <p className="text-sm text-gray-400">
            Your transaction could not be completed
          </p>
        </div>

        {/* Transaction Details */}
        <div className="px-6 py-5 border-b border-gray-100">
          <p className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-3">
            Transaction details
          </p>

          {transactionDetails.length > 0 ? (
            transactionDetails.map(({ label, value, bold }, i) => (
              <div
                key={label}
                className="flex justify-between items-center mb-2.5"
              >
                <span className="text-sm text-gray-400">{label}</span>
                <span
                  className={`text-sm ${
                    bold ? "font-medium text-gray-900" : "text-gray-800"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-300 text-center py-3">
              No transaction details available
            </div>
          )}
        </div>

        {/* Actions */}
        {/* <div className="flex flex-col gap-2.5 px-6 py-5">
          <button
            onClick={() => handleAction("retry")}
            className={`w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-medium transition-opacity ${
              loading === "retry" ? "opacity-60" : "hover:opacity-90"
            }`}
          >
            {loading === "retry" ? "Redirecting..." : "Try again →"}
          </button>

          <button
            onClick={() => handleAction("method")}
            className={`w-full py-3 bg-white text-gray-900 border border-gray-300 rounded-lg text-sm transition-opacity ${
              loading === "method" ? "opacity-60" : "hover:bg-gray-50"
            }`}
          >
            {loading === "method"
              ? "Loading..."
              : "Use a different payment method →"}
          </button>

          <button
            onClick={() => handleAction("support")}
            className="w-full py-2.5 text-gray-300 text-xs underline underline-offset-2"
          >
            Contact support
          </button>
        </div> */}
      </div>

      <p className="text-center text-xs text-gray-300 mt-4">
        You have not been charged. Safe to retry.
      </p>
    </div>
  );
}