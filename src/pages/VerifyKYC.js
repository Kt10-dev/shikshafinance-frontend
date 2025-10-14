import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";

function VerifyKYC() {
  const [files, setFiles] = useState({
    aadharFront: null,
    aadharBack: null,
    panFront: null,
    panBack: null,
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.aadharFront || !files.panFront) {
      setIsError(true);
      setMessage("Aadhaar and PAN front photos are mandatory.");
      return;
    }

    setUploading(true);
    setMessage("Uploading documents...");
    setIsError(false);

    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/kyc/upload-documents",
        formData,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setIsError(true);
      setMessage(
        err.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  // Helper component to render each file input
  const FileInput = ({ name, label }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
            >
              <span>Upload a file</span>
              <input
                id={name}
                name={name}
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, application/pdf"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          {files[name] && (
            <p className="text-xs text-green-500">{files[name].name}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Complete Your KYC
          </h2>
          <p className="mt-2 text-gray-600">
            Please upload the required documents to verify your identity.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileInput name="aadharFront" label="Aadhaar Card (Front)" />
            <FileInput name="aadharBack" label="Aadhaar Card (Back)" />
            <FileInput name="panFront" label="PAN Card (Front)" />
            <FileInput name="panBack" label="PAN Card (Back - Optional)" />
          </div>

          {message && (
            <p
              className={`text-sm text-center font-semibold ${
                isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload & Complete KYC"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyKYC;
