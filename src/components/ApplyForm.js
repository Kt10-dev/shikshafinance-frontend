import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. useNavigate import kiya

function ApplyForm() {
  const navigate = useNavigate(); // 2. navigate ko initialize kiya

  const [formData, setFormData] = useState({
    studentId: "",
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    aadhaar: "",
    fatherName: "",
    motherName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    nationality: "",
    personType: "Student",
    courseName: "",
    collegeName: "",
    courseDuration: "",
    currentYear: "",
    previousMarks: "",
    loanType: "Education Loan",
    loanAmount: "",
    incomeDetails: "",
    coApplicantName: "",
    coApplicantRelation: "",
    coApplicantPhone: "",
    coApplicantIncome: "",
    // Bank details bhi state mein add kar di hain
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 3. Loading state add ki

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 4. handleSubmit function ko poora update kiya gaya hai
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Submitting, please wait...");
    console.log("STATE BEFORE SUBMITTING:", formData);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append("document", file);
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/applications/apply",
        data,
        config
      );

      const { applicationId } = response.data;

      if (applicationId) {
        // SUCCESS: Ab form reset nahi karenge, seedha redirect karenge
        setMessage("Application submitted! Redirecting to payment...");
        navigate(`/pay-registration-fee/${applicationId}`);
      } else {
        setMessage("Error: Could not get Application ID. Please try again.");
      }
    } catch (error) {
      setMessage("Error submitting application. Please try again.");
      console.error("There was an error!", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-16 md:py-24" id="apply">
      <div className="container mx-auto px-6">
        <motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Apply For A Loan Today
          </h2>
          <p className="mt-2 text-gray-600">
            Fill out the form below to start your journey.
          </p>
        </motion.div>
        <motion.div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Student ID"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="p-3 border rounded-lg"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg bg-white text-gray-700"
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder="Aadhaar Number"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father's Name"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Mother's Name"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Nationality"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                placeholder="Course Name"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="College Name"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="courseDuration"
                value={formData.courseDuration}
                onChange={handleChange}
                placeholder="Course Duration/Years"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="currentYear"
                value={formData.currentYear}
                onChange={handleChange}
                placeholder="Current Year/ Semester"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="previousMarks"
                value={formData.previousMarks}
                onChange={handleChange}
                placeholder="Previous Marks/Percentage"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="Loan Amount (INR)"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="incomeDetails"
                value={formData.incomeDetails}
                onChange={handleChange}
                placeholder="Annual Family Income"
                required
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="coApplicantName"
                value={formData.coApplicantName}
                onChange={handleChange}
                placeholder="Co-Applicant Name"
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="coApplicantRelation"
                value={formData.coApplicantRelation}
                onChange={handleChange}
                placeholder="Co-Applicant Relation"
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="coApplicantPhone"
                value={formData.coApplicantPhone}
                onChange={handleChange}
                placeholder="Co-Applicant Mobile Number"
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="coApplicantIncome"
                value={formData.coApplicantIncome}
                onChange={handleChange}
                placeholder="Co-Applicant Annual Income"
                className="p-3 border rounded-lg"
              />

              <div className="md:col-span-2 mt-4 pt-4 border-t">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Bank Details for Loan Disbursal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleChange}
                    placeholder="Account Holder's Name"
                    required
                    className="p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="Account Number"
                    required
                    className="p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    placeholder="IFSC Code"
                    required
                    className="p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Bank Name"
                    required
                    className="p-3 border rounded-lg"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Please Upload Here Collage/School Student ID Card (PDF, JPG,
                  PNG)
                </label>
                <input
                  type="file"
                  name="document"
                  id="document-input"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <motion.button
                type="submit"
                disabled={loading} // Button ab disable hoga
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg disabled:bg-gray-400"
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
              >
                {loading ? "Submitting..." : "Submit & Proceed to Pay"}
              </motion.button>
            </div>
          </form>
          {message && (
            <p className="text-center mt-4 text-indigo-600">{message}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ApplyForm;
