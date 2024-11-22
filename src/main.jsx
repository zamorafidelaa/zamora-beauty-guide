import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Admin from "./pages/admin/Admin";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Consultation from "./pages/user/Consultation";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchSkincare from "./pages/user/SearchSkincare";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Base layout for routes
    children: [
      { path: "login", element: <Login /> }, // Child routes inherit from "/"
      { path: "register", element: <Register /> },
      {
        path: "admin",
        element: <ProtectedRoute role="admin" element={<Admin />} />, // Protect admin route
      },
      {
        path: "home",
        element: <ProtectedRoute role="user" element={<Home />} />, // Protect user route
      },
      { path: "about", element: <About /> },
      { path: "consultation", element: <Consultation /> },
      {path: "search-skincare", element: <SearchSkincare/>},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
