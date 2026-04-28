import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://officialtoolstore-server-1.onrender.com/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      `${product.name || ""} ${product.description || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-badge">🚀 Official Digital Tool Store</span>

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
              <div><strong>100%</strong><small>Trusted</small></div>
              <div><strong>24/7</strong><small>Support</small></div>
              <div><strong>SSL</strong><small>Payment</small></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="mini-card card-ai">🤖 AI Tools</div>
            <div className="mini-card card-design">🎨 Design Apps</div>
            <div className="mini-card card-pay">💳 Secure Pay</div>

            <div className="premium-card">
              <div className="premium-top">
                <span></span><span></span><span></span>
              </div>
              <h3>Premium Tools</h3>
              <p>Canva • ChatGPT • Gemini • Netflix • Productivity Apps</p>
              <div className="premium-line"></div>
              <Link to="/products">Explore Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-strip">
        {["ChatGPT", "Gemini", "Canva", "Grok", "Netflix"].map((brand) => (
          <div key={brand}>{brand}</div>
        ))}
      </section>

      <section className="home-section">
        <div className="section-head">
          <div>
            <h2>Popular Products</h2>
            <p>Find your favorite premium digital tools.</p>
          </div>

          <input
            className="home-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-box">No products found</div>
        ) : (
          <div className="home-product-grid">
            {filteredProducts.slice(0, 10).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="deal-banner">
        <div>
          <span className="deal-badge">🔥 Limited Offer</span>
          <h2>Get Premium Tools at Best Price</h2>
          <p>Order safely and manage everything from your account.</p>
        </div>
        <Link to="/products">Grab Now</Link>
      </section>

      <section className="home-section">
        <div className="center-title">
          <h2>Why Choose ToolStore?</h2>
          <p>Trusted, fast and secure digital tool shopping experience.</p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3>Fast Delivery</h3>
            <p>Quick activation with a smooth and fast process.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">🔐</div>
            <h3>Secure Payment</h3>
            <p>Safe and reliable payment with SSLCommerz.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">💯</div>
            <h3>Trusted Service</h3>
            <p>Clean, reliable and trusted shopping experience.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">📞</div>
            <h3>Support</h3>
            <p>24/7 support whenever you need help.</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="center-title">
          <h2>Customer Reviews</h2>
          <p>What users say about our service.</p>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card">⭐⭐⭐⭐⭐<p>Very fast delivery and trusted service!</p><h4>— Rahim</h4></div>
          <div className="testimonial-card">⭐⭐⭐⭐⭐<p>Best place to buy premium tools in BD.</p><h4>— Karim</h4></div>
          <div className="testimonial-card">⭐⭐⭐⭐⭐<p>Clean website and easy checkout system.</p><h4>— Arafat</h4></div>
        </div>
      </section>

      <section className="newsletter-box">
        <h2>Stay Updated</h2>
        <p>Get updates about new premium tools and offers.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </section>
    </div>
  );
}