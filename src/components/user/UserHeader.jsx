import { Heart, X, Menu, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const UserHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const currentUser = localStorage.getItem("currentUser") || "guest";

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(storedFavorites[currentUser] || []);
  }, [showFavoritesPopup, currentUser]);

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/consultation", label: "Consultation" },
    { to: "/product", label: "Product" },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <img
            src="image.png"
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full border-2 border-pink-400 shadow-md"
          />
          <h1 className="text-2xl font-extrabold tracking-wide text-pink-400">
            Zamora Beauty Guide
          </h1>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-medium group transition ${
                  isActive
                    ? "text-pink-500"
                    : "text-gray-700 hover:text-pink-400"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-pink-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFavoritesPopup(true)}
            className="text-pink-500 hover:text-pink-600 transition"
          >
            <Heart size={24} />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="text-gray-700 hover:text-pink-400 transition"
            >
              <User size={24} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-pink-50 text-gray-700"
                  onClick={() => setProfileOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-pink-50 text-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block relative font-medium group transition ${
                  isActive
                    ? "text-pink-500"
                    : "text-gray-700 hover:text-pink-400"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-pink-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              setShowFavoritesPopup(true);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition"
          >
            <Heart /> Favorites
          </button>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 hover:bg-pink-50 text-gray-700 rounded"
          >
            Profile
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* Favorites Popup */}
      {showFavoritesPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setShowFavoritesPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFavoritesPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Favorited Products
            </h2>

            {favorites.length > 0 ? (
              <ul className="space-y-3">
                {favorites.map((fav, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <img
                      src={`/${fav.image}`}
                      alt={fav.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="text-gray-700">{fav.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No products have been favorited yet.
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
