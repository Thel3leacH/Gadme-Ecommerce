import { ProductDetail } from "../components/productPage/ProductDetail";
import { ProductForm } from "../components/productPage/ProductForm";
import { ProductImage } from "../components/productPage/ProductImage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductPage() {
  const { name } = useParams();
  const decoded = decodeURIComponent(name || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API_URL}/productdetail/${encodeURIComponent(decoded)}`
        );
        setProducts(res.data.products);
      } catch (e) {
        if (!cancel) setError(e);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [decoded]);

  return (
    <div className="m-1 flex flex-col justify-center items-center gap-10 lg:m-15 lg:gap-15">
      <div className="flex flex-col gap-5 lg:flex-row">
        {loading && <div>Loading⌛...</div>}
        {error && <div className="text-red-600">โหลดข้อมูลไม่สำเร็จ</div>}
        <ProductImage products={products} />
        <ProductForm />
      </div>
      {/* <ProductDetail /> */}
    </div>
  );
}
