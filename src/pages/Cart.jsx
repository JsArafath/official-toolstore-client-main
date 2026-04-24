import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  if (cart.length === 0) {
    return <h2 className="container">Your cart is empty</h2>;
  }

  return (
    <div className="container">
      <h2>My Cart</h2>

      {cart.map((item) => (
        <div className="admin-product" key={item._id}>
          <div>
            <h4>{item.name}</h4>
            <p>৳ {item.price}</p>
          </div>

          <button onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ৳ {total}</h3>

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default Cart;