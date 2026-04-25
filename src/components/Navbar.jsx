import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          ToolStore
        </Link>

        {/* Links */}
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>

          {user && <NavLink to="/orders">My Orders</NavLink>}

          {user?.role === "admin" && (
            <>
              <NavLink to="/admin">Admin</NavLink>
              <NavLink to="/admin/orders">Admin Orders</NavLink>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="nav-right">
          {user ? (
            <>
              <span className="user-name">{user.name}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              {/* 🔥 Sign Up highlight */}
              <Link to="/register" className="signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;