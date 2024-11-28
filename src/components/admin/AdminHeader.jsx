import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role"); // Hapus role dari localStorage
    navigate("/login"); // Arahkan ke halaman login
  };

  return (
    <header className="admin-header">
      <h1 className="header-admin">Admin Panel - Zamora Beauty Guide</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>
    </header>
  );
}
