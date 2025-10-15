import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaRupeeSign, FaShieldAlt } from "react-icons/fa";

function PayRegistrationFee() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const registrationFeeAmount = 199;

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // BADLAAV YAHAN HAI: Sahi URL se data fetch karein
        const { data } = await axios.get(
          "https://shikshafinance-api.onrender.com/applications/my-application",
          {
            headers: { "x-auth-token": token },
          }
        );
        setApplication(data.application);
      } catch (err) {
        console.error("Could not fetch application details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppDetails();
  }, []);

  const handlePayment = async () => {
    // Check if application details are loaded
    if (!application) {
      alert("User details not loaded yet. Please wait a moment and try again.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const {
        data: { key },
      } = await axios.get(
        "https://shikshafinance-api.onrender.com/payment/get-key"
      );

      const { data: order } = await axios.post(
        "https://shikshafinance-api.onrender.com/payment/create-registration-order",
        { amount: registrationFeeAmount, applicationId: applicationId },
        { headers: { "x-auth-token": token } }
      );

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "ShikshaFinance Platform Fee",
        description: "One-time Application Processing Fee",
        order_id: order.id,
        handler: async function (response) {
          const verificationData = { ...response, applicationId };
          await axios.post(
            "https://shikshafinance-api.onrender.com/payment/verify-registration-payment",
            verificationData,
            { headers: { "x-auth-token": token } }
          );
          alert("Payment successful! Your application is now under review.");
          navigate("/dashboard");
        },
        prefill: {
          name: application.fullName,
          email: application.email,
          contact: application.phone,
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed! Please try again.");
      console.error("Payment Error:", error);
    }
  };

  if (loading)
    return <div className="text-center p-10">Loading Payment Details...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <FaShieldAlt className="mx-auto text-purple-600 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          One Last Step!
        </h1>
        <p className="text-gray-600 mb-6">
          Please pay the one-time platform fee to submit your application for
          review.
        </p>
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <p className="text-sm font-semibold text-purple-700">
            PLATFORM PROCESSING FEE
          </p>
          <p className="text-5xl font-extrabold text-purple-800 my-2">
            <FaRupeeSign className="inline-block" /> {registrationFeeAmount}
          </p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
        >
          Pay Securely Now
        </button>
      </div>
    </div>
  );
}

export default PayRegistrationFee;
