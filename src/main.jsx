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
import Product from "./pages/user/Product";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import "./index.css";

const router = createBrowserRouter([
  { 
    path: "login", element: <Login /> 
  }, 
  { 
    path: "register", element: <Register /> 
  },
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "admin",
        element: <AdminRoutes role="admin" element={<Admin />} />, 
      },
      {
        path: "home",
        element: <UserRoutes role="user" element={<Home />} />,
      },
      { path: "about", 
        element: <About /> 
      },
      { path: "consultation", 
        element: <Consultation /> 
      },
      { path: "product", 
        element: <Product /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
