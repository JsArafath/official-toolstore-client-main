import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();

      console.log("Products response:", data);

      const productList = Array.isArray(data) ? data : data.products || [];
      setProducts(productList);
    } catch (err) {
      console.error(err);
      setError("Products load failed");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Products</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <p className="text-slate-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}