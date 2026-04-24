import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {products.map((p) => (
        <Link
          key={p._id}
          to={`/products/${p._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
            cursor: "pointer"
          }}>
            <img src={p.image} alt="" width="100%" />
            <h3>{p.name}</h3>
            <p>{p.category}</p>
            <p>৳ {p.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Products;