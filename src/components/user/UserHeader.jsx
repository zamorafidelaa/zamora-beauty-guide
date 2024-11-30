import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react"; 

const UserHeader = () => {
  const navigate = useNavigate();
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); 

  function handleLogout() {
    localStorage.removeItem("role");
    navigate("/login");
  }

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites data:", error);
      }
    }
  }, [showFavoritesPopup]);

  const toggleFavoritesPopup = () => {
    setShowFavoritesPopup((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="user-header">
      <div className="logo">
        <img src="image.png" alt="Logo" className="logo-image" />
        <h1 className="site-title">Zamora Beauty Guide</h1>
      </div>

      <button className="hamburger-button" onClick={toggleMenu}>
        {menuOpen ? <X/> : <Menu/>}
      </button>

      <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          <X />
        </button>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link" onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/consultation" className="nav-link" onClick={toggleMenu}>
              Consultation
            </Link>
          </li>
          <li>
            <Link to="/product" className="nav-link" onClick={toggleMenu}>
              Product
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link" onClick={toggleMenu}>
              Profile
            </Link>
          </li>
          <li className="favorites">
            <button onClick={toggleFavoritesPopup} className="favorites-button">
              <Heart className="icon-heart" />
            </button>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>

      {/* Popup Favorit */}
      {showFavoritesPopup && (
        <div className="favorites-popup-overlay" onClick={toggleFavoritesPopup}>
          <div
            className="favorites-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Favorited Products</h2>
            {favorites.length > 0 ? (
              <ul className="favorites-list">
                {favorites.map((favorite, idx) => (
                  <li key={idx} className="favorite-item">
                    <img
                      src={`/${favorite.image}`}
                      alt={favorite.name}
                      className="favorite-image"
                    />
                    <div className="favorite-info">
                      <h4>{favorite.name}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products have been favorited yet.</p>
            )}
            <button onClick={toggleFavoritesPopup} className="close-button">
              <X />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
