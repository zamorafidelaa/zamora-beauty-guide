import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("userLogin")) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "zamora" && password === "zamora1744") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!user) {
        alert("Incorrect username or password.");
      } else {
        alert("Login successful.");
        localStorage.setItem("role", "user");
        navigate("/home");
      }
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <div className="auth-footer">
        <p>Don't have an account?</p>
        <button onClick={navigateToRegister} className="auth-link">
          Register here
        </button>
      </div>
    </div>
  );
};

export default Login;
