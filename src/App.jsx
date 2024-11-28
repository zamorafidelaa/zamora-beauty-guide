import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "./components/user/UserHeader";
import UserFooter from "./components/user/UserFooter";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // Peran pengguna (admin atau user)
  const [favorites, setFavorites] = useState([]); // State untuk produk favorit
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah ada status login yang disimpan di localStorage
    const storedRole = localStorage.getItem("role");
    const currentPath = window.location.pathname; // Ambil path saat ini

    if (storedRole) {
      setRole(storedRole);
      setIsLoggedIn(true);

      // Pastikan pengguna tetap berada di halaman yang sesuai dengan role
      if (storedRole === "admin" && !currentPath.startsWith("/admin")) {
        navigate("/admin");
      } else if (storedRole === "user" && (currentPath === "/" || currentPath.startsWith("/admin"))) {
        navigate("/home");
      }
    } else {
      navigate("/login"); // Jika tidak ada role, arahkan ke halaman login
    }
  }, [navigate]);

  // Fungsi untuk menambah atau menghapus produk dari favorit
  const toggleFavorite = (productName) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productName)
        ? prevFavorites.filter((name) => name !== productName)
        : [...prevFavorites, productName]
    );
  };

  return (
    <div>
      {isLoggedIn && role === "user" && (
        <>
          <UserHeader favorites={favorites} /> {/* Pass favorites ke UserHeader */}
          <Outlet
            context={{
              favorites,
              toggleFavorite,
            }}
          />
          <UserFooter />
        </>
      )}
      {isLoggedIn && role === "admin" && <Outlet />}
    </div>
  );
};

export default App;
