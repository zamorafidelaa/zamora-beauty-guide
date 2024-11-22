// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // "user" or "admin"
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake authentication (You can replace this with an actual API call)
    if (username === "admin" && password === "admin" && role === "admin") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else if (username === "user" && password === "user" && role === "user") {
      localStorage.setItem("role", "user");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
