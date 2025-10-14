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
          "http://localhost:5000/applications/my-application",
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
      const token = localStorage.getItem("token");
      // Step 1: Backend se Razorpay key lo
      const {
        data: { key },
      } = await axios.get("http://localhost:5000/payment/get-key");

      // Step 2: NAYE WALE ROUTE se Order create karo
      const { data: order } = await axios.post(
        "http://localhost:5000/payment/create-registration-order",
        {
          amount: registrationFeeAmount,
          applicationId: applicationId,
        },
        { headers: { "x-auth-token": token } }
      );

      // Step 3: Razorpay options
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "ShikshaFinance Registration",
        description: "Loan Application Registration Fee",
        order_id: order.id,
        handler: async function (response) {
          // Step 4: NAYE WALE ROUTE se Payment verify karo
          const verificationData = { ...response, applicationId };
          await axios.post(
            "http://localhost:5000/payment/verify-registration-payment",
            verificationData,
            { headers: { "x-auth-token": token } }
          );
          alert("Payment successful! Your application is now under review.");
          navigate("/dashboard"); // Payment ke baad dashboard par bhej do
        },
        prefill: {
          name: application?.fullName || "User Name",
          email: application?.email || "user@example.com",
          contact: application?.phone || "9999999999",
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
