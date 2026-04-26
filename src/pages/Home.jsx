import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://officialtoolstore-server-1.onrender.com/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      const productList = Array.isArray(data)
        ? data
        : data.products || [];
      setProducts(productList);
    } catch (error) {
      console.error("Home products load failed:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="home-page">

      {/* 🔥 HERO SECTION */}
      <section className="home-hero">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-badge">
              🚀 Official Digital Tool Store
            </span>

            <h1>
              Buy Premium <br />
              Digital Tools <span>Safely</span>
            </h1>

            <p>
              Get AI tools, design apps, productivity software and premium
              subscriptions with a clean, fast and trusted shopping experience.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="primary-btn">
                Browse Products
              </Link>

              <Link to="/cart" className="secondary-btn">
                View Cart
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>100%</strong>
                <small>Trusted</small>
              </div>
              <div>
                <strong>24/7</strong>
                <small>Support</small>
              </div>
              <div>
                <strong>SSL</strong>
                <small>Payment</small>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="mini-card card-ai">🤖 AI Tools</div>
            <div className="mini-card card-design">🎨 Design Apps</div>
            <div className="mini-card card-pay">💳 Secure Pay</div>

            <div className="premium-card">
              <div className="premium-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <h3>Premium Tools</h3>
              <p>Canva • ChatGPT • Gemini • Netflix • Productivity Apps</p>

              <div className="premium-line"></div>

              <Link to="/products">Explore Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🛍️ PRODUCTS */}
      <section className="home-section">
        <div className="section-head">
          <h2>Popular Products</h2>
          <Link to="/products">View All</Link>
        </div>

        {products.length === 0 ? (
          <div className="empty-box">No products found</div>
        ) : (
          <div className="home-product-grid">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}