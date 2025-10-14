// src/auth/UserProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

function UserProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default UserProtectedRoute;
