import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Officialtoolstore</h2>
          <p>
            Trusted place for premium digital tools, AI subscriptions, design
            apps and productivity software.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/my-orders">My Orders</Link>
        </div>

        <div className="footer-links">
          <h3>Support</h3>
          <a href="mailto:mohaiminulislam077777@gmail.com">Email Support</a>
          <a href="tel:01725713593">Call Now</a>
          <a
            href="https://wa.me/8801725713593"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📍 Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Officialtoolstore. All rights reserved.</p>
      </div>
    </footer>
  );
}