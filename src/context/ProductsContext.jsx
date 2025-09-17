import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/productlist`, {
        withCredentials: true,
        signal,
      });

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

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [fetchProducts]);

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
      refresh: () => fetchProducts(),
      productById: (id) => byIdMap.get(String(id)) ?? null,
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
