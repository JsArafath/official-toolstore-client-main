import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const API = "http://localhost:5000/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h2 className="container">Loading...</h2>;

  return (
    <div className="container">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px" }}
      />

      <h2>{product.name}</h2>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <h3>৳ {product.price}</h3>

      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;