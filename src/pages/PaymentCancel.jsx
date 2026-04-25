import { Link } from "react-router-dom";

function PaymentCancel() {
  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-icon cancel">⚠️</div>
        <h2>Payment Cancelled</h2>
        <p>You cancelled the payment process.</p>

        <div className="payment-actions">
          <Link to="/cart" className="btn">
            Back to Cart
          </Link>
          <Link to="/products" className="btn secondary-btn">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentCancel;