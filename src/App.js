// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import VerifyKYC from "./pages/VerifyKYC"; // NAYI LINE
import AdminLogin from "./pages/AdminLogin"; // Login page ko import karein
import ProtectedRoute from "./auth/ProtectedRoute"; // ProtectedRoute ko import karein
import UserProtectedRoute from "./auth/UserProtectedRoute"; // For User
import Register from "./pages/Register"; // NAYI LINE
import Login from "./pages/Login"; // NAYI LINE
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import HowItWorks from "./components/HowItWorks";
import ApplyLoan from "./pages/ApplyLoan"; // NAYI LINE
import PayRegistrationFee from "./components/PayRegistrationFee"; // <
import CancellationsAndRefunds from "./pages/CancellationsAndRefunds";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> {/* NAYI LINE */}
        <Route path="/login" element={<Login />} /> {/* NAYI LINE */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route
          path="/apply-loan"
          element={
            <UserProtectedRoute>
              <ApplyLoan />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/pay-registration-fee/:applicationId"
          element={<PayRegistrationFee />}
        />
        {/* Admin page ko ab ProtectedRoute se wrap karein */}
        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <Dashboard />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/cancellations-and-refunds"
          element={<CancellationsAndRefunds />}
        />
        <Route
          path="/verify-kyc"
          element={
            <UserProtectedRoute>
              <VerifyKYC />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
