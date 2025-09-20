import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ProductLists = () => {
  const [products, setProducts] = useState([]);      // ให้ default เป็น [] เสมอ
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        // ระวัง "/" ให้ถูก ต้องได้เป็น .../productlist
        const url = `${API_URL?.replace(/\/?$/, "/")}productlist`;
        const res = await axios.get(url);

        // กันกรณี backend ส่งรูปแบบไม่ตรง: {products: [...] } หรือส่งเป็น array ตรง ๆ
        const data = res?.data;
        const list = Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data)
            ? data
            : [];

        if (!cancelled) setProducts(list);
      } catch (e) {
        if (!cancelled) {
          console.error("Fetch products failed:", e);
          setError(e);
          setProducts([]); // กันพัง
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
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
