import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role"); // Ambil role dari localStorage
  const isLoggedIn = !!userRole; // Cek apakah ada role (berarti sudah login)

  if (!isLoggedIn) {
    // Jika pengguna belum login, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // Jika ada role yang tidak cocok, arahkan ke halaman lain (misalnya home)
    return <Navigate to="/home" />;
  }

  return children; // Jika lolos, tampilkan halaman yang diminta
};

export default ProtectedRoute;
