import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const UserHeader = () => {
  const navigate = useNavigate();
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [favorites, setFavorites] = useState([]); // Menyimpan data favorites

  // Fungsi logout
  function handleLogout() {
    localStorage.removeItem("role"); // Menghapus role dari localStorage
    navigate("/login"); // Redirect ke login page
  }

  // Load data favorites dari localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites); // Parse data dari localStorage
        setFavorites(parsedFavorites); // Update state dengan data favorites
      } catch (error) {
        console.error("Error parsing favorites data:", error);
      }
    }
  }, [showFavoritesPopup]); // Refresh data ketika popup di-toggle

  // Toggle visibility untuk popup
  const toggleFavoritesPopup = () => {
    setShowFavoritesPopup((prev) => !prev);
  };

  return (
    <header className="user-header">
      <div className="logo">
        <img src="image.png" alt="Logo" className="logo-image" />
        <h1 className="site-title">Zamora Beauty Guide</h1>
      </div>
      <nav className="main-nav">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/consultation" className="nav-link">
              Consultation
            </Link>
          </li>
          <li>
            <Link to="/product" className="nav-link">
              Product
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link">
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

      {/* Popup untuk menampilkan produk favorit */}
      {showFavoritesPopup && (
        <div className="favorites-popup-overlay" onClick={toggleFavoritesPopup}>
          <div
            className="favorites-popup-content"
            onClick={(e) => e.stopPropagation()} // Agar klik di dalam popup tidak menutup
          >
            <h2>Favorited Products</h2>
            {favorites.length > 0 ? (
              <ul className="favorites-list">
                {favorites.map((favorite, idx) => (
                  <li key={idx} className="favorite-item">
                    <img
                      src={`/${favorite.image}`} // Menampilkan gambar dari localStorage
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
