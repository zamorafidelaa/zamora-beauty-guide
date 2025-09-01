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
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username: "zamora", role: "admin" })
      );
      alert("Admin login successful");
      navigate("/admin");
      return;
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      alert("Incorrect username or password.");
    } else {
      alert("Login successful.");
      localStorage.setItem("role", "user");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-pink-500 text-center mb-2">
          Login
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
          />
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-semibold rounded-xl shadow-md hover:bg-pink-600 hover:scale-105 transition transform duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-pink-500 font-semibold hover:underline cursor-pointer"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
