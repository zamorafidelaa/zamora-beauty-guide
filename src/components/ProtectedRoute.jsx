import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, role: requiredRole }) => {
  const role = localStorage.getItem("role");

  // Redirect to login if the user is not authenticated
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate routes based on role
  if (requiredRole === "admin" && role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  if (requiredRole === "user" && role !== "user") {
    return <Navigate to="/admin" replace />;
  }

  // Render the protected element if role matches
  return Component;
};

export default ProtectedRoute;
