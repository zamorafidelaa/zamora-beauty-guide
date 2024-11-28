import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (username && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("userLogin")) || [];
      const isUsernameTaken = users.some((user) => user.username === username);

      if (isUsernameTaken) {
        alert("Username is already taken. Please choose a different one.");
        return;
      }

      users.push({ username, password });
      localStorage.setItem("userLogin", JSON.stringify(users));
      alert("User registered successfully!");
      navigate("/login");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Register</h1>
      <p className="auth-subtitle">
        Create a new account and join our community!
      </p>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">Register</button>
      </form>
      <div className="auth-footer">
        <p>Already have an account?</p>
        <button onClick={() => navigate("/login")} className="auth-link">
          Login here
        </button>
      </div>
    </div>
  );
};

export default Register;
