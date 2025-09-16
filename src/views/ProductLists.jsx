import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

const API_URL = "http://localhost:3000/";

const ProductLists = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}productlist`);
        setProducts(res.data.products); // ดึง array ออกมาให้ถูกต้อง
      } catch (e) {
        if (e.name !== "CanceledError") setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Loading Error</div>;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductLists;
