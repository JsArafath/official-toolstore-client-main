import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      const productList = Array.isArray(data) ? data : data.products || [];
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
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-badge">Official Digital Tool Store</span>

          <h1>Buy Premium Digital Tools Safely</h1>

          <p>
            Get AI tools, design apps, productivity software and premium
            subscriptions with a clean and trusted shopping experience.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="primary-btn">
              Browse Products
            </Link>

            <Link to="/cart" className="secondary-btn">
              View Cart
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>Browse Categories</h2>
          <Link to="/products">View All</Link>
        </div>

        <div className="category-grid">
          <div className="category-card active">
            <div className="cat-icon">✨</div>
            <h3>All</h3>
            <p>{products.length} products</p>
          </div>

          <div className="category-card">
            <div className="cat-icon">🤖</div>
            <h3>AI Tools</h3>
            <p>Premium tools</p>
          </div>

          <div className="category-card">
            <div className="cat-icon">🎨</div>
            <h3>Design</h3>
            <p>Creative apps</p>
          </div>

          <div className="category-card">
            <div className="cat-icon">💼</div>
            <h3>Productivity</h3>
            <p>Work tools</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>Popular Products</h2>
          <Link to="/products">View All Products</Link>
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

      <section className="home-cta">
        <div>
          <h2>Need premium tools quickly?</h2>
          <p>Order safely and manage everything from your account.</p>
        </div>

        <Link to="/products">Start Shopping</Link>
      </section>
    </div>
  );
}