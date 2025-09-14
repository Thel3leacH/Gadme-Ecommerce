import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/";
const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}productlist`);
      setProducts(res.data);
    } catch {
      console.log("Failed to fetch productlist");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      refresh: fetchProducts,
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
