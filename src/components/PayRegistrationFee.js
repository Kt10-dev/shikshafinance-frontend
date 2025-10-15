import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaRupeeSign, FaShieldAlt } from "react-icons/fa";

function PayRegistrationFee() {
  const { applicationId } = useParams(); // URL se application ID nikalega
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Yeh registration fee fix hai
  const registrationFeeAmount = 199; // Aap isko change kar sakte hain

  // Get user details for prefill
  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "https://shikshafinance-api.onrender.com",
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
    try {
      setLoading(true); // Assuming you have a loading state
      const token = localStorage.getItem("token");

      // Call the new Instamojo backend route
      const { data } = await axios.post(
        "https://shikshafinance-api.onrender.com/instamojo/create-payment-link",
        {
          amount: registrationFeeAmount,
          purpose: "ShikshaFinance Platform Fee",
          buyer_name: application.fullName,
          email: application.email,
          applicationId: applicationId,
        },
        { headers: { "x-auth-token": token } }
      );

      if (data.success && data.payment_url) {
        // Redirect the user to the Instamojo payment page
        window.location.href = data.payment_url;
      } else {
        alert("Could not create payment link. Please try again.");
      }
    } catch (error) {
      alert("Payment initiation failed! Please try again.");
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <FaShieldAlt className="mx-auto text-purple-600 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          One Last Step!
        </h1>
        <p className="text-gray-600 mb-6">
          Please pay the one-time registration fee to submit your application
          for review.
        </p>
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <p className="text-sm font-semibold text-purple-700">
            REGISTRATION FEE
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
