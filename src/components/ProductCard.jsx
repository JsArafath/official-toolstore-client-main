import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <Link to={`/products/${product._id}`}>
        <h3>
          {product.name}
          {product.duration && (
            <span className="duration-badge"> {product.duration}</span>
          )}
        </h3>
      </Link>

      <p>{product.description}</p>
      <h4>৳{product.prices?.["1 Month"] || product.price}</h4>

      <Link to={`/products/${product._id}`} className="btn">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;