import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      // NOTE: ถ้าไฟล์อยู่ใน public/products.json ให้ fetch("/products.json")
      // ถ้าอยู่ใน src/data/products.json ให้เปลี่ยนมา import ตรงแทน
      const r = await fetch("/products.json");
      const data = await r.json();
      setProducts(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      refresh: load,
      productById: (id) => products.find((p) => String(p.id) === String(id)),
    }),
    [products, loading, error]
  );

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
