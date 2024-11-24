import { Link } from "react-router-dom";
export default function AdminHeader() {
  return (
    <header className="admin-header">
      <h1 className="header-admin">Admin Panel - Zamora Beauty Guide</h1>
      <nav>
      <ul>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
      </nav>
    </header>
  );
}
