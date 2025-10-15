// src/pages/PaymentStatus.js
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState(
    "Verifying your payment, please wait..."
  );

  useEffect(() => {
    const paymentStatus = searchParams.get("payment_status");
    const paymentId = searchParams.get("payment_id");
    const applicationId = searchParams.get("app_id");

    if (paymentStatus === "Credit") {
      // Payment was successful, now update the application status in the backend
      const verifyAndUpdate = async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.patch(
            `https://shikshafinance-api.onrender.com/applications/update-fee-status/${applicationId}`,
            {}, // No body needed, just the token
            { headers: { "x-auth-token": token } }
          );
          setStatus("success");
          setMessage(
            "Payment successful! Your application is now under review."
          );
        } catch (err) {
          setStatus("error");
          setMessage(
            "Payment was successful, but we failed to update your application. Please contact support."
          );
        }
      };
      verifyAndUpdate();
    } else {
      // Payment failed or was cancelled
      setStatus("error");
      setMessage("Payment failed or was cancelled. Please try again.");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        {status === "processing" && (
          <div className="animate-spin h-12 w-12 mx-auto border-4 border-indigo-500 border-t-transparent rounded-full"></div>
        )}
        {status === "success" && (
          <FaCheckCircle className="text-green-500 w-16 h-16 mx-auto" />
        )}
        {status === "error" && (
          <FaTimesCircle className="text-red-500 w-16 h-16 mx-auto" />
        )}

        <h2
          className={`mt-6 text-2xl font-bold ${
            status === "success"
              ? "text-green-700"
              : status === "error"
              ? "text-red-700"
              : "text-gray-800"
          }`}
        >
          {status === "success"
            ? "Payment Complete!"
            : status === "error"
            ? "Payment Failed"
            : "Processing..."}
        </h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PaymentStatus;
