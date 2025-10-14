import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminStats from "../components/AdminStats";
import io from "socket.io-client"; // 1. Naya import

function Admin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editData, setEditData] = useState({});
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewingUserDocs, setViewingUserDocs] = useState(null);

  // 2. useEffect ko poora update kiya gaya hai
  useEffect(() => {
    // Pehli baar data fetch karo
    axios
      .get("https://shikshafinance-api.onrender.com/applications/")
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the applications!", error);
        setError("Could not fetch applications.");
        setLoading(false);
      });

    // Backend se socket connection banao
    const socket = io("https://shikshafinance-api.onrender.com");

    // Listener 1: Jab nayi application aaye
    socket.on("new_application_added", (newApplication) => {
      console.log("Real-time: New application received!");
      // Nayi application ko list mein sabse upar add karo
      // Populate ke data ko frontend par manually add karna padega
      setApplications((prevApps) => [
        {
          ...newApplication,
          userId: {
            name: "New User",
            email: newApplication.email,
            kycDocuments: {},
          },
        },
        ...prevApps,
      ]);
    });

    // Listener 2: Jab status update ho
    socket.on("status_updated", (update) => {
      console.log("Real-time: Status update received for", update.id);
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === update.id
            ? {
                ...app,
                status: update.status,
                loanTenure: update.loanTenure,
                interestRate: update.interestRate,
              }
            : app
        )
      );
    });

    // Cleanup: Jab component band ho, to connection close kar do
    return () => {
      socket.disconnect();
    };
  }, []); // Empty array ka matlab hai ki yeh sirf ek baar chalega

  const handleInputChange = (id, field, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [id]: { ...prevData[id], [field]: value },
    }));
  };

  const handleDownloadStatement = async (app) => {
    try {
      const response = await axios.get(
        `https://shikshafinance-api.onrender.com/applications/${app._id}/download-statement`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const fileName = `Statement_${app.fullName.replace(" ", "_")}_${
        app._id
      }.pdf`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Could not download statement", err);
      alert("Error downloading statement.");
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    const dataToUpdate = { status: newStatus };
    if (newStatus === "Approved") {
      const tenure = editData[id]?.loanTenure;
      const rate = editData[id]?.interestRate;
      if (!tenure || !rate) {
        alert("Please enter both Tenure and Rate before approving.");
        return;
      }
      dataToUpdate.loanTenure = tenure;
      dataToUpdate.interestRate = rate;
    }
    // Ab hum sirf backend ko request bhejenge, UI update socket se hoga
    axios
      .patch(
        `https://shikshafinance-api.onrender.com/applications/update-status/${id}`,
        dataToUpdate
      )
      .catch((error) => {
        console.error("Error updating status!", error);
        alert(
          `Error: ${error.response?.data?.error || "Could not update status"}`
        );
      });
  };

  const handleSendManualReminder = async (loanId, emiId, userEmail) => {
    if (
      window.confirm(
        `Are you sure you want to send an EMI reminder to ${userEmail}?`
      )
    ) {
      try {
        const response = await axios.post(
          `https://shikshafinance-api.onrender.com/applications/${loanId}/send-reminder/${emiId}`
        );
        alert(response.data.message);
      } catch (error) {
        alert("Failed to send reminder. Please check the console.");
        console.error("Error sending manual reminder:", error);
      }
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">
        Loan Applications Dashboard
      </h1>
      <AdminStats />
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Applicant
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Loan Details
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Documents
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                EMI Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                App Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Tenure (M)
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Rate (%)
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap">
                  <div className="font-semibold">{app.fullName}</div>
                  <div className="text-sm text-gray-500">{app.email}</div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="font-semibold">
                    ₹{app.loanAmount.toLocaleString("en-IN")}
                  </div>
                  <div className="text-sm text-gray-500">{app.courseName}</div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <button
                    onClick={() => setViewingUserDocs(app)}
                    className="text-sm bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                  >
                    View All
                  </button>
                </td>
                <td className="p-4 whitespace-nowrap">
                  {app.status === "Approved" &&
                  app.repaymentSchedule?.length > 0 ? (
                    (() => {
                      const total = app.repaymentSchedule.length;
                      const paid = app.repaymentSchedule.filter(
                        (e) => e.status === "Paid"
                      ).length;
                      return (
                        <div>
                          <span className="font-semibold">
                            {paid}/{total} Paid
                          </span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(paid / total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      app.status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : ""
                    } ${
                      app.status === "Rejected" ? "bg-red-200 text-red-800" : ""
                    } ${
                      app.status === "Pending" || app.status === "Pending Fee"
                        ? "bg-yellow-200 text-yellow-800"
                        : ""
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <input
                    type="number"
                    placeholder="e.g., 24"
                    defaultValue={app.loanTenure}
                    onChange={(e) =>
                      handleInputChange(app._id, "loanTenure", e.target.value)
                    }
                    className="w-20 p-2 border rounded"
                    disabled={app.status !== "Pending"}
                  />
                </td>
                <td className="p-4 whitespace-nowrap">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 8.5"
                    defaultValue={app.interestRate}
                    onChange={(e) =>
                      handleInputChange(app._id, "interestRate", e.target.value)
                    }
                    className="w-20 p-2 border rounded"
                    disabled={app.status !== "Pending"}
                  />
                </td>
                <td className="p-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(app._id, "Approved")}
                    disabled={app.status !== "Pending"}
                    className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-300"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app._id, "Rejected")}
                    disabled={app.status !== "Pending"}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-300"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: EMI Details */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">{selectedApp.fullName}</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDownloadStatement(selectedApp)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Download Statement
                </button>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold mb-4">Repayment Schedule</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Due Date</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedApp.repaymentSchedule.map((emi, index) => (
                    <tr key={emi._id} className="border-t">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">
                        {new Date(emi.dueDate).toLocaleDateString("en-IN")}
                      </td>
                      <td className="p-2">
                        ₹{emi.emiAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            emi.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : ""
                          } ${
                            emi.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : ""
                          } ${
                            emi.status === "Overdue"
                              ? "bg-red-100 text-red-800"
                              : ""
                          }`}
                        >
                          {emi.status}
                        </span>
                      </td>
                      <td className="p-2">
                        {(emi.status === "Pending" ||
                          emi.status === "Overdue") && (
                          <button
                            onClick={() =>
                              handleSendManualReminder(
                                selectedApp._id,
                                emi._id,
                                selectedApp.email
                              )
                            }
                            className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Send Reminder
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Document Viewer */}
      {viewingUserDocs && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setViewingUserDocs(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">
                Documents for: {viewingUserDocs.fullName}
              </h2>
              <button
                onClick={() => setViewingUserDocs(null)}
                className="text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {viewingUserDocs.documentUrl && (
                <div>
                  <h3 className="font-semibold mb-2">
                    1. Loan Application Document
                  </h3>
                  <a
                    href={viewingUserDocs.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={viewingUserDocs.documentUrl}
                      alt="Loan Document"
                      className="w-full rounded border hover:opacity-80"
                    />
                  </a>
                </div>
              )}
              {viewingUserDocs.userId?.kycDocuments?.aadhaarFrontUrl && (
                <div>
                  <h3 className="font-semibold mb-2">
                    2. Aadhaar Card (Front)
                  </h3>
                  <a
                    href={viewingUserDocs.userId.kycDocuments.aadhaarFrontUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={viewingUserDocs.userId.kycDocuments.aadhaarFrontUrl}
                      alt="Aadhaar Front"
                      className="w-full rounded border hover:opacity-80"
                    />
                  </a>
                </div>
              )}
              {viewingUserDocs.userId?.kycDocuments?.aadhaarBackUrl && (
                <div>
                  <h3 className="font-semibold mb-2">3. Aadhaar Card (Back)</h3>
                  <a
                    href={viewingUserDocs.userId.kycDocuments.aadhaarBackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={viewingUserDocs.userId.kycDocuments.aadhaarBackUrl}
                      alt="Aadhaar Back"
                      className="w-full rounded border hover:opacity-80"
                    />
                  </a>
                </div>
              )}
              {viewingUserDocs.userId?.kycDocuments?.panUrl && (
                <div>
                  <h3 className="font-semibold mb-2">4. PAN Card</h3>
                  <a
                    href={viewingUserDocs.userId.kycDocuments.panUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={viewingUserDocs.userId.kycDocuments.panUrl}
                      alt="PAN Card"
                      className="w-full rounded border hover:opacity-80"
                    />
                  </a>
                </div>
              )}
            </div>
            {!viewingUserDocs.documentUrl &&
              !viewingUserDocs.userId?.kycDocuments?.aadhaarFrontUrl && (
                <div className="p-6 text-center text-gray-500">
                  <p>No documents found for this user.</p>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
