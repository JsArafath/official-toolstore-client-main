import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tran_id");

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await axios.post(`${API}/payment/verify`, {
          tran_id: tranId,
        });

        setStatus("success");
      } catch (err) {
        console.log(err.response?.data || err.message);
        setStatus("failed");
      }
    };

    if (tranId) verifyPayment();
  }, [tranId]);

  return (
    <div className="payment-page">
      <div className="payment-card">
        {status === "verifying" && (
          <>
            <div className="payment-icon loading">⏳</div>
            <h2>Verifying Payment...</h2>
            <p>Please wait while we confirm your transaction.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="payment-icon success">✅</div>
            <h2>Payment Successful</h2>
            <p>Your order has been placed successfully.</p>
            <p>
              <b>Transaction ID:</b> {tranId}
            </p>

            <div className="payment-actions">
              <Link to="/my-orders" className="btn">
                View My Orders
              </Link>
              <Link to="/products" className="btn secondary-btn">
                Continue Shopping
              </Link>
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="payment-icon failed">❌</div>
            <h2>Verification Failed</h2>
            <p>Payment was not verified. Please contact support.</p>

            <Link to="/cart" className="btn">
              Back to Cart
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;