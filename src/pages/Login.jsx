import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const API =
  import.meta.env.VITE_API_URL ||
  "https://officialtoolstore-server-1.onrender.com/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/login`, form);

      const userData = res.data?.user;
      const userToken = res.data?.token;

      if (!userData || !userToken) {
        setError("Invalid login response from server");
        return;
      }

      login(userData, userToken);

      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-left">
          <span className="login-badge">Official Tool Store</span>
          <h1>Welcome Back</h1>
          <p>
            Login to buy premium digital tools, manage your orders and submit
            product reviews.
          </p>

          <div className="login-features">
            <div>✅ Secure Payment</div>
            <div>✅ Fast Digital Delivery</div>
            <div>✅ Order Tracking</div>
          </div>
        </div>

        <div className="login-card">
          <h2>Login</h2>
          <p className="login-subtitle">Access your ToolStore account</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="login-bottom">
            Don&apos;t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;