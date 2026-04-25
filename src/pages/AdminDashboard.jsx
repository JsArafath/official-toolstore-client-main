import { useEffect, useState } from "react";
import "./AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    image: "",
    category: "",
    description: "",
    prices: {
      "1 Month": "",
      "3 Months": "",
      "6 Months": "",
      "1 Year": "",
    },
  });

  const getToken = () => localStorage.getItem("token") || "";

  const loadProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data.products || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    setForm({
      ...form,
      prices: {
        ...form.prices,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      alert("Token missing. Please logout and login again.");
      return;
    }

    const productData = {
      name: form.name,
      image: form.image,
      category: form.category,
      description: form.description,
      prices: {
        "1 Month": form.prices["1 Month"],
        "3 Months": form.prices["3 Months"],
        "6 Months": form.prices["6 Months"],
        "1 Year": form.prices["1 Year"],
      },
    };

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Product add failed");
      return;
    }

    alert("Product added successfully");

    setForm({
      name: "",
      image: "",
      category: "",
      description: "",
      prices: {
        "1 Month": "",
        "3 Months": "",
        "6 Months": "",
        "1 Year": "",
      },
    });

    loadProducts();
  };

  const handleDelete = async (id) => {
    const token = getToken();

    if (!token) {
      alert("Token missing. Please logout and login again.");
      return;
    }

    if (!window.confirm("Delete this product?")) return;

    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Delete failed");
      return;
    }

    alert("Product deleted");
    loadProducts();
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-card">
          <h1>Admin Dashboard</h1>

          <form onSubmit={handleAddProduct} className="admin-form">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              required
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />

            <div className="price-grid">
              <input
                type="number"
                name="1 Month"
                value={form.prices["1 Month"]}
                onChange={handlePriceChange}
                placeholder="1 Month Price"
              />

              <input
                type="number"
                name="3 Months"
                value={form.prices["3 Months"]}
                onChange={handlePriceChange}
                placeholder="3 Months Price"
              />

              <input
                type="number"
                name="6 Months"
                value={form.prices["6 Months"]}
                onChange={handlePriceChange}
                placeholder="6 Months Price"
              />

              <input
                type="number"
                name="1 Year"
                value={form.prices["1 Year"]}
                onChange={handlePriceChange}
                placeholder="1 Year Price"
              />
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows="5"
              required
            />

            <button type="submit">Add Product</button>
          </form>
        </div>

        <h2 className="all-title">All Products</h2>

        <div className="product-list">
          {products.map((product) => (
            <div className="admin-product" key={product._id}>
              <div>
                <h3>{product.name}</h3>

                {product.prices?.["1 Month"] > 0 && (
                  <p>1 Month: ৳{product.prices["1 Month"]}</p>
                )}

                {product.prices?.["3 Months"] > 0 && (
                  <p>3 Months: ৳{product.prices["3 Months"]}</p>
                )}

                {product.prices?.["6 Months"] > 0 && (
                  <p>6 Months: ৳{product.prices["6 Months"]}</p>
                )}

                {product.prices?.["1 Year"] > 0 && (
                  <p>1 Year: ৳{product.prices["1 Year"]}</p>
                )}
              </div>

              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}