import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";

const App = () => {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [role, setRole] = useState(""); // Peran pengguna (admin atau user)
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Cek apakah ada status login yang disimpan di localStorage
  //   const storedRole = localStorage.getItem("role");
  //   if (storedRole) {
  //     setRole(storedRole);
  //     setIsLoggedIn(true);
  //     navigate(storedRole === "admin" ? "/admin" : "/home"); // Arahkan ke halaman yang sesuai
  //   } else {
  //     navigate("/login"); // Jika tidak ada role, arahkan ke halaman login
  //   }
  // }, [navigate]);

  // return (
  //   <div>
  //     {isLoggedIn ? (
  //       // Jika sudah login, arahkan ke halaman sesuai role (admin atau user)
  //       <Outlet />
  //     ) : (
  //       // Jika belum login, arahkan ke halaman login
  //       <Outlet />
  //     )}
  //   </div>
  
  return(
    <div>
    {/* {isAdmin ? <AdminRoutes /> : <UserRoutes />} */}
    <UserRoutes/>
    {/* <AdminRoutes/> */}
  </div>
);

};

export default App;
