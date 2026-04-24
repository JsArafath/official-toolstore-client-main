import { useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link, useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const tranId = searchParams.get("tran_id");

  useEffect(() => {
    if (tranId) {
      axios.patch(`${API}/payment/success/${tranId}`).then(() => {
        clearCart();
      });
    }
  }, [tranId]);

  return (
    <div className="container">
      <h2>✅ Payment Successful</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/products">Continue Shopping</Link>
    </div>
  );
}

export default PaymentSuccess;