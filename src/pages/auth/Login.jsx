import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]); // Menyimpan daftar pengguna yang sudah terdaftar
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data pengguna dari localStorage saat komponen dimuat
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Periksa jika login sebagai admin
    if (username === "zamora" && password === "zamora1744") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else {
      // Periksa pengguna terdaftar di localStorage
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      console.log(user);
      if (!user) {
        alert("Ini gamasuk anj");
      } else {
        alert("ini masuk");
        localStorage.setItem("role", "user");
        navigate("/home");
      }    
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      
      <div>
        <p>Don't have an account?</p>
        <button onClick={navigateToRegister}>Register here</button>
      </div>
    </div>
  );
};

export default Login;
