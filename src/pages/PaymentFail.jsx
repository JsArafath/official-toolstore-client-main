import { useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function PaymentFail() {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tran_id");

  useEffect(() => {
    if (tranId) {
      axios.patch(`${API}/payment/fail/${tranId}`);
    }
  }, [tranId]);

  return (
    <div className="container">
      <h2>❌ Payment Failed</h2>
      <p>Your payment was not completed.</p>
      <Link to="/checkout">Try Again</Link>
    </div>
  );
}

export default PaymentFail;