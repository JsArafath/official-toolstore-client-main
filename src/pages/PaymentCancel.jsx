import { useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tran_id");

  useEffect(() => {
    if (tranId) {
      axios.patch(`${API}/payment/cancel/${tranId}`);
    }
  }, [tranId]);

  return (
    <div className="container">
      <h2>⚠️ Payment Cancelled</h2>
      <p>You cancelled the payment.</p>
      <Link to="/cart">Back to Cart</Link>
    </div>
  );
}

export default PaymentCancel;