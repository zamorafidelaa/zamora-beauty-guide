import { Link } from "react-router-dom";
export default function AdminHeader() {
  return (
    <header>
      <h1>Admin Panel</h1>
      <nav>
      <ul>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
      </nav>
    </header>
  );
}
