import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0); // Counter untuk mencatat jumlah percobaan login

  function handleLogin(e) {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = storedUsers.findIndex(
      (u) => u.username === username && u.password === password
    );

    // Jika login berhasil
    if (userIndex !== -1) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", storedUsers[userIndex].role);

      storedUsers[userIndex].role === "admin"
        ? navigate("/admin")
        : navigate("/user");
    } else {
      // Jika login gagal
      alert("Username atau password salah.");
      const updatedAttempts = attempts + 1;
      setAttempts(updatedAttempts);

      if (updatedAttempts >= 3) {
        alert(
          "Anda telah gagal login sebanyak 3 kali. Silakan registrasi ulang."
        );

        // Hapus user lama
        const updatedUsers = storedUsers.filter(
          (u) => u.username !== username
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Arahkan ke halaman registrasi
        navigate("/register");
      }
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form">
        <h1 className="title-login">Login</h1>
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
          Login
        </button>
        <p>
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="register-link"
          >
            Daftar
          </button>
        </p>
      </form>
    </div>
  );
}
