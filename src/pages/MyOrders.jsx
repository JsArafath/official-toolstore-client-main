import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchOrders();
  }, [user]);

  if (!user) return <h2 className="container">Please login first</h2>;

  return (
    <div className="container">
      <h2>My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="empty-box">No orders found</div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="premium-order-card" key={order._id}>
              <div className="order-top">
                <h3>Order #{order._id.slice(-6)}</h3>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>

              <p>
                <b>Transaction:</b> {order.transactionId}
              </p>

              <p>
                <b>Total:</b> ৳{order.totalAmount}
              </p>

              <p>
                <b>Date:</b>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="order-products">
                {order.products?.map((item, index) => (
                  <div key={index} className="order-product-row">
                    <span>{item.product?.name || "Product"}</span>
                    <span>Qty: {item.quantity || 1}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;