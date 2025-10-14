// src/auth/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

  if (!isLoggedIn) {
    // Agar user logged in nahi hai, to login page par bhej do
    return <Navigate to="/admin/login" />;
  }

  // Agar logged in hai, to page dikha do
  return children;
}

export default ProtectedRoute;
