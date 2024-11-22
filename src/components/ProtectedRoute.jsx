/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  // Redirect ke login jika belum login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Redirect berdasarkan role saat mengakses '/'
  if (role === "admin" && window.location.pathname === "/") {
    return <Navigate to="/admin" />;
  }

  if (role === "user" && window.location.pathname === "/") {
    return <Navigate to="/home" />;
  }

  return children;
}
