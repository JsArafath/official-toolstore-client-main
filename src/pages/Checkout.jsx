import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "https://officialtoolstore-server-1.onrender.com/api";

export default function Checkout() {
  const cartContext = useCart();
  const authContext = useAuth();

  const cartItems = cartContext?.cartItems || cartContext?.cart || [];
  const clearCart = cartContext?.clearCart || (() => {});

  const user = authContext?.user;
  const token = authContext?.token || localStorage.getItem("token");

  const [customer, setCustomer] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePayNow = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const products = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        duration: item.duration || item.selectedDuration || "1 Month",
      }));

      const res = await fetch(`${API_URL}/payment/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products,
          totalAmount,
          customer,
        }),
      });

      const data = await res.json();
      console.log("Payment response:", data);

      if (data?.success && data?.gatewayUrl) {
        clearCart();
        window.location.href = data.gatewayUrl;
      } else {
        alert(data?.message || "Gateway URL not found");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <h3 className="font-semibold">
                      {item.name}{" "}
                      <span className="text-sm text-blue-600">
                        {item.duration || item.selectedDuration || "1 Month"}
                      </span>
                    </h3>
                    <p>
                      ৳{item.price} × {item.quantity || 1}
                    </p>
                  </div>

                  <p className="font-bold">
                    ৳{Number(item.price || 0) * Number(item.quantity || 1)}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">Total: ৳{totalAmount}</h2>

            <div className="grid gap-4">
              <input
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="address"
                value={customer.address}
                onChange={handleChange}
                placeholder="Address"
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <button
              onClick={handlePayNow}
              disabled={loading}
              className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}