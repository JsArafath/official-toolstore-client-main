import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

function Checkout() {
  const { cart } = useCart();
  const { user, token } = useAuth();

  const [customer, setCustomer] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "Dhaka",
  });

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handlePayment = async () => {
    try {
      if (!token) return alert("Please login first");
      if (cart.length === 0) return alert("Cart is empty");
      if (!customer.phone) return alert("Please enter phone number");

      const { data } = await axios.post(
        `${API}/payment/create-payment`,
        { cart, customer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Payment response:", data);

      if (!data.url) {
        return alert("Payment URL not found");
      }

      window.location.href = data.url;
    } catch (error) {
      console.log("Payment error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Payment error");
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <p key={item._id}>
              {item.name} — ৳{item.price}
            </p>
          ))}

          <h3>Total: ৳{total}</h3>

          <input
            type="text"
            placeholder="Name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Address"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />

          <button onClick={handlePayment}>Pay Now</button>
        </>
      )}
    </div>
  );
}

export default Checkout;