import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [duration, setDuration] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const loadProduct = async () => {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    setProduct(data.product || data);
  };

  const loadReviews = async () => {
    const res = await fetch(`${API_URL}/reviews/${id}`);
    const data = await res.json();
    setReviews(data.reviews || []);
  };

  useEffect(() => {
    loadProduct();
    loadReviews();
  }, [id]);

  const availableDurations = product
    ? Object.entries(product.prices || {})
        .filter(([_, price]) => Number(price) > 0)
        .map(([duration]) => duration)
    : [];

  useEffect(() => {
    if (product && availableDurations.length > 0 && !duration) {
      setDuration(availableDurations[0]);
    }
  }, [product, availableDurations, duration]);

  useEffect(() => {
    if (product && duration) {
      const price = product.prices?.[duration] ?? product.price;
      setSelectedPrice(price);
    }
  }, [duration, product]);

  const handleAddToCart = () => {
    const finalPrice = product.prices?.[duration] ?? product.price;

    addToCart({
      ...product,
      price: finalPrice,
      duration,
      selectedDuration: duration,
      quantity: 1,
    });

    alert("Added to cart");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token) return setMessage("Please login first");
    if (!comment.trim()) return setMessage("Comment is required");

    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: id,
        rating: Number(rating),
        comment,
      }),
    });

    const data = await res.json();

    if (!res.ok) return setMessage(data.message || "Review failed");

    setMessage("Review submitted successfully");
    setComment("");
    setRating(5);
    loadReviews();
  };

  if (!product) return <div className="pd-loading">Loading...</div>;

  return (
    <div className="pd-page">
      <div className="pd-container">
        <div className="pd-card">
          <div className="pd-image-box">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="pd-info">
            <span className="pd-badge">Digital Subscription</span>

            <h1>
              {product.name} {duration && <span>{duration}</span>}
            </h1>

            <p className="pd-desc">{product.description}</p>

            <h2>৳{selectedPrice}</h2>

            <label>Select Duration</label>

            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
              {availableDurations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>

        <div className="review-card">
          <div className="review-head">
            <h2>Customer Reviews</h2>
            <span>{reviews.length} Reviews</span>
          </div>

          {reviews.length === 0 ? (
            <p className="empty-review">No reviews yet.</p>
          ) : (
            <div className="review-grid">
              {reviews.map((review) => (
                <div className="review-item" key={review._id}>
                  <div>
                    <h3>{review.name}</h3>
                    <p className="stars">{"★".repeat(review.rating)}</p>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          <div className="review-form-box">
            <h2>Add Your Review</h2>

            {message && (
              <p className={message.includes("success") ? "msg success" : "msg error"}>
                {message}
              </p>
            )}

            <form onSubmit={handleReviewSubmit}>
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                rows="5"
              />

              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}