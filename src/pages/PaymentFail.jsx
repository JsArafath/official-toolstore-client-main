import { Link } from "react-router-dom";

function PaymentFail() {
  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-icon failed">❌</div>
        <h2>Payment Failed</h2>
        <p>Your payment could not be completed.</p>

        <div className="payment-actions">
          <Link to="/cart" className="btn">
            Try Again
          </Link>
          <Link to="/products" className="btn secondary-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentFail;