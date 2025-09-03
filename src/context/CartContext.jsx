import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const LS_KEY = "cart:v1";

export function CartProvider({ children }) {
  // โครงเก็บข้อมูลแบบ { [productId]: qty }
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // ซิงก์ลง localStorage ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  // (ทางเลือก) ซิงก์ข้ามแท็บ
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_KEY && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Actions
  const add = (id, qty = 1) =>
    setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));

  const decrement = (id, qty = 1) =>
    setItems((prev) => {
      const next = { ...prev };
      const cur = next[id] || 0;
      const val = cur - qty;
      if (val > 0) next[id] = val;
      else delete next[id];
      return next;
    });

  const setQty = (id, qty) =>
    setItems((prev) => {
      const next = { ...prev };
      if (qty > 0) next[id] = qty;
      else delete next[id];
      return next;
    });

  const remove = (id) =>
    setItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const clear = () => setItems({});

  // Selectors/derived
  const totalQty = useMemo(
    () => Object.values(items).reduce((sum, n) => sum + n, 0),
    [items]
  );
  const itemCount = useMemo(() => Object.keys(items).length, [items]);
  const qtyOf = (id) => items[id] || 0;
  const has = (id) => !!items[id];

  const value = {
    items,
    totalQty,
    itemCount,
    add,
    decrement,
    setQty,
    remove,
    clear,
    qtyOf,
    has,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider />");
  return ctx;
}
