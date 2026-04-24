import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h1>Premium Digital Tools Store</h1>
      <p>Buy authorized software tools, apps, and digital services securely.</p>
      <Link to="/products" className="btn">Browse Products</Link>
    </section>
  );
}

export default Home;