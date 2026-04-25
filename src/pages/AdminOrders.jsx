import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminOrders = async () => {
      try {
        const res = await axios.get(`${API}/orders/admin-orders`, {
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

    if (user?.token) fetchAdminOrders();
  }, [user]);

  if (!user) return <h2 className="container">Please login first</h2>;
  if (user.role !== "admin") return <h2 className="container">Access Denied</h2>;

  return (
    <div className="container">
      <h2>Admin Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="empty-box">No orders found</div>
      ) : (
        <div className="admin-orders-table">
          {orders.map((order) => (
            <div className="admin-order-card" key={order._id}>
              <div>
                <h3>{order.user?.name}</h3>
                <p>{order.user?.email}</p>
              </div>

              <div>
                <p>
                  <b>Order:</b> #{order._id.slice(-6)}
                </p>
                <p>
                  <b>Transaction:</b> {order.transactionId}
                </p>
              </div>

              <div>
                <p>
                  <b>Total:</b> ৳{order.totalAmount}
                </p>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-products">
                {order.products?.map((item, index) => (
                  <p key={index}>
                    {item.product?.name || "Product"} × {item.quantity || 1}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;