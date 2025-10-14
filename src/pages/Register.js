// src/pages/Register.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  // 1. State ko ek object mein manage kiya gaya hai
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Yeh function sabhi inputs ke liye kaam karega
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 3. Ab poora formData object (name ke saath) bheja ja raha hai
      const response = await axios.post(
        "https://shikshafinance-api.onrender.com/users/register",
        formData
      );
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response.data.message || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 2. NAAM KE LIYE NAYA INPUT FIELD ADD KIYA GAYA HAI */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name" // name attribute zaroori hai
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email" // name attribute zaroori hai
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password" // name attribute zaroori hai
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg"
            />
          </div>
          {message && (
            <p className="text-sm text-center text-indigo-600">{message}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
