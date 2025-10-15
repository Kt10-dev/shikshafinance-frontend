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
        const { data } = await axios.get(
          "https://shikshafinance-api.onrender.com/applications/my-application",
          { headers: { "x-auth-token": token } }
        );
        setApplication(data.application);
      } catch (err) {
        console.error("Could not fetch application details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppDetails();
  }, [navigate]);

  // --- BADLAAV YAHAN HAI: Yeh naya Instamojo wala function hai ---
  const handlePayment = async () => {
    if (!application) {
      alert("Application details not loaded. Please wait and try again.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Yeh redirect URL Instamojo ko batayega ki payment ke baad kahan waapis aana hai
      const redirectUrl = `https://shikshafinance-frontend.vercel.app/payment-status?app_id=${applicationId}`;

      const { data } = await axios.post(
        "https://shikshafinance-api.onrender.com/instamojo/create-payment-link",
        {
          amount: registrationFeeAmount,
          purpose: "ShikshaFinance Platform Fee",
          buyer_name: application.fullName,
          email: application.email,
          redirect_url: redirectUrl, // Hum backend ko naya redirect URL bhej rahe hain
        },
        { headers: { "x-auth-token": token } }
      );

      if (data.success && data.payment_url) {
        // User ko Instamojo ke payment page par bhej do
        window.location.href = data.payment_url;
      } else {
        alert("Could not create payment link. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      alert("Payment initiation failed! Please try again.");
      console.error("Payment Error:", error);
      setLoading(false);
    }
  };
  // --- BADLAAV KHATAM ---

  if (loading) return <div className="text-center p-10">Loading...</div>;

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
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Pay Securely Now"}
        </button>
      </div>
    </div>
  );
}

export default PayRegistrationFee;
