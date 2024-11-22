import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Contoh login sederhana, pastikan untuk mengganti ini dengan validasi sebenarnya
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      navigate("/");
    } else if (username === "user" && password === "user") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");
      navigate("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
