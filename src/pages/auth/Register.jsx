// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi input
    if (username && password) {
      // Ambil data user yang ada di localStorage, atau inisialisasi dengan array kosong
      const users = JSON.parse(localStorage.getItem("userLogin")) || [];

      // Tambahkan user baru ke array
      users.push({ username, password });

      // Simpan kembali array ke localStorage
      localStorage.setItem("userLogin", JSON.stringify(users));

      // Tampilkan pesan sukses dan arahkan ke halaman login
      alert("User registered successfully!");
      navigate("/login");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
