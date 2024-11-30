import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

export default function AdminHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="admin-header">
      <h1 className="header-admin">Admin Panel - Zamora Beauty Guide</h1>

      <button className="humburger-button" onClick={toggleMenu}>
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && (
        <>
          <div className="popup-overlay-two" onClick={() => setMenuOpen(false)}></div>
          <div className="popup-menu">
            <ul>
              <li className="header-link">
                <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              </li>
              <li className="header-link">
                <Link to="/complaints" onClick={() => setMenuOpen(false)}>Complaints</Link>
              </li>
            </ul>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </>
      )}
    </header>
  );
}
