import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const { user, token } = useAuth();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  async function fetchProducts() {
    const res = await axios.get(`${API}/products`);
    setProducts(Array.isArray(res.data) ? res.data : []);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    await axios.post(
      `${API}/products`,
      {
        ...form,
        price: Number(form.price),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product added");

    setForm({
      name: "",
      price: "",
      image: "",
      category: "",
      description: "",
    });

    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Product deleted");
    fetchProducts();
  };

  if (!user) {
    return <h2 className="container">Please login first</h2>;
  }

  if (user.role !== "admin") {
    return <h2 className="container">Access Denied</h2>;
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleAddProduct} className="admin-form">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <button type="submit">Add Product</button>
      </form>

      <h3>All Products</h3>

      {products.map((product) => (
        <div className="admin-product" key={product._id}>
          <span>
            {product.name} — ৳{product.price}
          </span>

          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;