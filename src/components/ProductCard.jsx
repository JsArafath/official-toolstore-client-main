import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const price = product.prices?.["1 Month"] || product.price;

  return (
    <div className="premium-product-card">
      <Link to={`/products/${product._id}`} className="premium-product-img">
        <img src={product.image} alt={product.name} />

        {product.duration && (
          <span className="premium-duration">{product.duration}</span>
        )}
      </Link>

      <div className="premium-product-body">
        <Link to={`/products/${product._id}`} className="premium-title-link">
          <h3>{product.name}</h3>
        </Link>

        <p>
          {product.description?.length > 120
            ? product.description.slice(0, 120) + "..."
            : product.description}
        </p>

        <div className="premium-product-footer">
          <h4>৳{price}</h4>

          <Link to={`/products/${product._id}`} className="premium-details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;