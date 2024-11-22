import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <div className="admin-page">
      <h1>Welcome, Admin!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Admin;
