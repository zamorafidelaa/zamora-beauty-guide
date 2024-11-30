import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "./components/user/UserHeader";
import UserFooter from "./components/user/UserFooter";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); 
  const [favorites, setFavorites] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const currentPath = window.location.pathname; 

    if (storedRole) {
      setRole(storedRole);
      setIsLoggedIn(true);

      if (storedRole === "admin" && !currentPath.startsWith("/admin")) {
        navigate("/admin");
      } else if (storedRole === "user" && (currentPath === "/" || currentPath.startsWith("/admin"))) {
        navigate("/home");
      }
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

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
          <UserHeader favorites={favorites} /> 
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
