import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import io from "socket.io-client";
import {
  FaUserGraduate,
  FaEnvelope,
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaShieldAlt,
  FaDownload,
} from "react-icons/fa";

const statusStyles = {
  Approved: "text-green-600 bg-green-100",
  Rejected: "text-red-600 bg-red-100",
  Pending: "text-yellow-600 bg-yellow-100",
  "Pending Fee": "text-orange-600 bg-orange-100",
  Paid: "text-blue-600 bg-blue-100",
  Overdue: "text-orange-600 bg-orange-100",
};

function StylishDashboard() {
  const [application, setApplication] = useState(null);
  const [kycStatus, setKycStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(
        "https://shikshafinance-api.onrender.com/applications/my-application",
        { headers: { "x-auth-token": token } }
      );
      setApplication(response.data.application);
      setKycStatus(response.data.kycStatus);
    } catch (err) {
      setError(err.response?.data?.msg || "Could not fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const socket = io("https://shikshafinance-api.onrender.com");
    socket.on("status_updated", (update) => {
      // Refresh data when a status update is received from the server
      fetchDashboardData();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePayment = async (emi) => {
    if (!application) return;
    try {
      const token = localStorage.getItem("token");
      const {
        data: { key },
      } = await axios.get(
        "https://shikshafinance-api.onrender.com/payment/get-key"
      );
      const { data: order } = await axios.post(
        "https://shikshafinance-api.onrender.com/payment/create-order",
        {
          amount: emi.emiAmount,
          loanId: application._id,
          emiId: emi._id,
        },
        { headers: { "x-auth-token": token } }
      );
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "ShikshaFinance",
        description: `EMI Payment for Loan`,
        order_id: order.id,
        handler: async function (response) {
          const verificationData = {
            ...response,
            loanId: application._id,
            emiId: emi._id,
          };
          await axios.post(
            "https://shikshafinance-api.onrender.com/payment/verify-payment",
            verificationData,
            { headers: { "x-auth-token": token } }
          );
          alert("Payment successful!");
          fetchDashboardData();
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
    } catch (paymentError) {
      alert("Could not initiate payment. Please try again.");
      console.error("Payment Error:", paymentError);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDownloadStatement = async () => {
    if (!application) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://shikshafinance-api.onrender.com/applications/my-application/download-statement",
        {
          headers: { "x-auth-token": token },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `LoanStatement_${application._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Could not download statement", err);
      alert("Error downloading statement. Is your loan approved?");
    }
  };

  const renderStatusIcon = (status) => {
    if (status === "Approved")
      return <FaCheckCircle className="text-green-500 w-6 h-6" />;
    if (status === "Rejected")
      return <FaTimesCircle className="text-red-500 w-6 h-6" />;
    if (status === "Pending" || status === "Pending Fee")
      return (
        <FaHourglassHalf className="text-yellow-500 w-6 h-6 animate-spin" />
      );
    return null;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderMainContent = () => {
    if (loading)
      return (
        <div className="p-10 text-center text-xl font-semibold">Loading...</div>
      );
    if (error)
      return <div className="p-10 text-center text-red-500">{error}</div>;

    if (application) {
      // User has an application, show the details
      return (
        <div className="grid grid-cols-1 gap-8">
          {/* --- Application Details Section --- */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <FaUserGraduate className="text-purple-600 w-12 h-12" />
                  <h2 className="text-3xl font-bold text-purple-700">
                    {application.fullName}
                  </h2>
                </div>
                {kycStatus === "Verified" && (
                  <span className="flex items-center bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                    <FaCheckCircle className="mr-2" /> KYC Verified
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <FaEnvelope className="w-6 h-6" />
                <p className="text-lg">{application.email}</p>
              </div>
              <div className="flex justify-between items-center bg-purple-50 rounded-lg p-4 shadow-inner">
                <div>
                  <p className="text-2xl font-extrabold text-purple-800">
                    <FaRupeeSign className="inline" />{" "}
                    {application.loanAmount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm uppercase tracking-wider font-semibold text-purple-600 mt-1">
                    Loan Amount
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-purple-800">
                    {application.loanTenure
                      ? `${application.loanTenure} months`
                      : "N/A"}
                  </p>
                  <p className="text-sm uppercase tracking-wider font-semibold text-purple-600 mt-1">
                    Tenure
                  </p>
                </div>
              </div>
              <div className="flex justify-between bg-purple-50 rounded-lg p-4 shadow-inner">
                <div>
                  <p className="text-2xl font-bold text-purple-800">
                    {application.interestRate
                      ? `${application.interestRate}%`
                      : "N/A"}
                  </p>
                  <p className="text-sm uppercase tracking-wider font-semibold text-purple-600 mt-1">
                    Interest Rate
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-purple-800">
                    {formatDate(application.createdAt)}
                  </p>
                  <p className="text-sm uppercase tracking-wider font-semibold text-purple-600 mt-1">
                    Applied On
                  </p>
                </div>
              </div>
            </div>
            {/* Status Card */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-3xl shadow-xl p-8 flex flex-col justify-between">
              <h2 className="text-4xl font-extrabold mb-6 text-yellow-700 flex items-center space-x-4">
                <span>Application Status</span>
                {renderStatusIcon(application.status)}
              </h2>
              <div
                className={`inline-block px-6 py-3 rounded-xl font-extrabold text-3xl tracking-wide ${
                  statusStyles[application.status]
                }`}
              >
                {application.status}
              </div>
              {application.status === "Pending" && (
                <div className="mt-10">
                  <p className="mt-2 text-yellow-700 font-medium">
                    Your application is under review by our team. You will be
                    notified of any updates.
                  </p>
                </div>
              )}
              {application.status === "Pending Fee" && (
                <div className="mt-10">
                  <p className="mt-2 text-orange-700 font-medium">
                    Please pay the one-time platform fee to proceed with the
                    review.
                  </p>
                  <Link to={`/pay-registration-fee/${application._id}`}>
                    <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-md shadow">
                      Pay Fee Now
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* --- Repayment Schedule Section --- */}
          {application.status === "Approved" &&
            application.repaymentSchedule?.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-purple-700">
                    Repayment Schedule
                  </h2>
                  <button
                    onClick={handleDownloadStatement}
                    className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    <FaDownload className="mr-2" />
                    Download Statement
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="border-b-2 border-gray-200">
                      <tr>
                        <th className="p-4 font-semibold text-gray-700">
                          EMI #
                        </th>
                        <th className="p-4 font-semibold text-gray-700">
                          Due Date
                        </th>
                        <th className="p-4 font-semibold text-gray-700">
                          Amount
                        </th>
                        <th className="p-4 font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="p-4 font-semibold text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {application.repaymentSchedule.map((emi, index) => (
                        <tr key={emi._id} className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-800">
                            {index + 1}
                          </td>
                          <td className="p-4 text-gray-600">
                            {formatDate(emi.dueDate)}
                          </td>
                          <td className="p-4 font-semibold text-gray-800">
                            <FaRupeeSign className="inline-block" />{" "}
                            {emi.emiAmount.toLocaleString("en-IN")}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                statusStyles[emi.status]
                              }`}
                            >
                              {emi.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handlePayment(emi)}
                              disabled={
                                emi.status !== "Pending" &&
                                emi.status !== "Overdue"
                              }
                              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              Pay Now
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
      );
    } else {
      // User does NOT have an application
      return (
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h2>
          {kycStatus === "Verified" ? (
            <>
              <p className="text-gray-600 mb-8">
                Your KYC is verified. You can now start your application to get
                connected with our lending partners.
              </p>
              <Link
                to="/apply-loan"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Start New Application
              </Link>
            </>
          ) : (
            <p className="text-gray-600 mb-8">
              Please complete your KYC to start a new loan application.
            </p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-50 to-yellow-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-purple-700 drop-shadow-lg">
            My Application Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-7 rounded-full shadow-lg transition"
          >
            Logout
          </button>
        </div>
        {kycStatus === "Pending" && !loading && (
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-4 rounded-lg shadow-md mb-8"
            role="alert"
          >
            <div className="flex items-center">
              <FaShieldAlt className="w-6 h-6 mr-3" />
              <div>
                <p className="font-bold">Action Required: Complete Your KYC</p>
                <p>Please verify your identity to proceed.</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/verify-kyc")}
              className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md shadow"
            >
              Verify KYC Now
            </button>
          </div>
        )}
        {renderMainContent()}
      </div>
    </div>
  );
}

export default StylishDashboard;
