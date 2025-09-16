import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import axios from "axios";

// const API_URL = import.meta?.env?.VITE_API_URL ?? "http://localhost:3000/"; // ✅ อย่าฮาร์ดโค้ด
const API_URL = import.meta.env.VITE_API_URL;

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]); // รายการสินค้า
  const [loading, setLoading] = useState(true); // สถานะโหลด
  const [error, setError] = useState(null); // เก็บ error ไว้อ่านที่ UI

  // ✅ ห่อด้วย useCallback ให้ identity คงที่ และใส่ cleanup กัน memory leak
  const fetchProducts = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}productlist`, {
        withCredentials: true, // ถ้าใช้คุกกี้ session ให้เปิดไว้; ไม่ใช้ก็ถอดได้
        signal, // รองรับ abort (Axios v1+)
      });

      // ✅ รองรับทั้ง { products: [...] } และ [...] ตรงๆ
      const list = Array.isArray(res.data?.products)
        ? res.data.products
        : Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setProducts(list);
    } catch (e) {
      if (axios.isCancel?.(e)) return; // ถูกยกเลิกตอน unmount
      console.error("Failed to fetch getAllProducts:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ โหลดครั้งแรก + ยกเลิกเมื่อ component ถูก unmount
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [fetchProducts]);

  // ✅ ทำแผนที่ id -> product ให้ค้นหา O(1) และรองรับทั้ง _id / id (หรือ product_id)
  const byIdMap = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const key = String(p?._id ?? p?.id ?? p?.product_id ?? "");
      if (key) map.set(key, p);
    }
    return map;
  }, [products]);

  const value = useMemo(() => {
    return {
      products,
      loading,
      error,
      refresh: () => fetchProducts(), // เรียกใหม่จากข้างนอกได้
      productById: (id) => byIdMap.get(String(id)) ?? null, // เร็วและทนกว่า find()
    };
  }, [products, loading, error, byIdMap, fetchProducts]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx)
    throw new Error("useProducts must be used inside <ProductsProvider />");
  return ctx;
}
