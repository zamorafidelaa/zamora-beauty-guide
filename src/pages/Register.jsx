import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Cek jika username sudah digunakan
    if (storedUsers.find((user) => user.username === username)) {
      alert("Username sudah digunakan.");
      return;
    }

    // Tambahkan user baru dengan role 'user'
    storedUsers.push({ username, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(storedUsers));
    alert("Registrasi berhasil. Silakan login.");
    navigate("/login");
  }

  return (
    <div className="form-container">
      <form onSubmit={handleRegister} className="form">
        <h1 className="title-register">Register</h1>
        <label>
          Username:
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
}
