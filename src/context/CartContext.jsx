// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const CartContext = createContext(null);
const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:3000";

export function CartProvider({ children, apiBase = API_URL }) {
  const { user, loading: authLoading } = useAuth();
  // รวม “ชิ้น”
  const [totalQty, setTotalQty] = useState(0);
  // รวม “รายการ”
  const [totalItems, setTotalItems] = useState(0);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // per-item lock กันกดรัว
  const busyRef = useRef(new Set());
  const withItemLock = async (key, fn) => {
    if (key && busyRef.current.has(key)) return;
    if (key) busyRef.current.add(key);
    try {
      return await fn();
    } finally {
      if (key) busyRef.current.delete(key);
    }
  };
  const isBusy = (key) => busyRef.current.has(key);

  // ===== Helpers: อ่าน meta จาก response =====
  const isNum = (v) => typeof v === "number" && Number.isFinite(v);
  const readQty = (d) =>
    [d?.count_items, d?.count, d?.totalQty].find((v) => isNum(v)); // รับ 0 ได้
  const readLines = (d) => [d?.count_lines, d?.lines].find((v) => isNum(v)); // รับ 0 ได้

  // อัปเดต meta จาก payload; ถ้าไม่มีทั้งสองค่า จะคืน false
  const syncMeta = (data) => {
    let updated = false;
    const q = readQty(data);
    const l = readLines(data);
    if (isNum(q)) {
      setTotalQty(q);
      updated = true;
    }
    if (isNum(l)) {
      setTotalItems(l);
      updated = true;
    }
    return updated;
  };

  // ดึง meta ครั้งเดียวสำหรับ navbar (ทั้งสองค่า)
  const fetchCartMeta = async () => {
    const r = await axios.get(`${apiBase}/cart/meta`, {
      withCredentials: true,
    });
    // อัปเดตจาก response (รับ 0)
    syncMeta(r.data);
  };
  const refreshCartMeta = fetchCartMeta;

  useEffect(() => {
    if (authLoading) return;
    if (user?._id) {
      fetchCartMeta().catch((e) =>
        console.log("cart meta on login failed:", e.response?.data || e.message)
      );
    } else {
      // logout/anonymous → รีเซ็ต badge
      setTotalQty(0);
      setTotalItems(0);
    }
  }, [authLoading, user?._id, apiBase]);

  // ออปชัน: รีเฟรชเมื่อแท็บโฟกัส/กลับมา
  useEffect(() => {
    const onFocus = () => {
      if (!authLoading && user?._id) fetchCartMeta().catch(() => {});
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [authLoading, user?._id, apiBase]);

  // ===== Actions =====

  // Add to cart
  const addToCart = async (payload) => {
    const inc = Number(payload?.product_qty ?? 1) || 1;
    setAdding(true);
    const tId = toast.loading("กำลังเพิ่มลงตะกร้า...");
    setTotalQty((c) => c + inc); // optimistic “ชิ้น”

    try {
      const res = await axios.post(`${apiBase}/cart`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      // ถ้า response ไม่มี meta ครบ → fetch แค่ครั้งเดียว
      if (!syncMeta(res.data)) await fetchCartMeta();

      const name = payload?.product_name ?? "Product";
      toast.success(`Added ${name} x ${inc} item to your cart. 🛒`, {
        id: tId,
      });
      return res.data;
    } catch (e) {
      setTotalQty((c) => Math.max(0, c - inc)); // rollback
      const msg =
        e.response?.data?.message ||
        e.response?.data?.code ||
        e.message ||
        "Add to cart failed";
      toast.error(msg, { id: tId });
      throw e;
    } finally {
      setAdding(false);
    }
  };

  // set absolute qty
  const setQty = async (itemId, nextQty, { currentQty } = {}) =>
    withItemLock(itemId, async () => {
      const next = Number(nextQty);
      if (!Number.isFinite(next) || next < 1) return;

      const delta =
        typeof currentQty === "number" ? next - Number(currentQty) : 0;

      const tId = toast.loading(
        delta > 0 ? "Increasing quantity…" : "Decreasing quantity…"
      );
      if (delta) setTotalQty((c) => Math.max(0, c + delta)); // optimistic

      try {
        const res = await axios.put(
          `${apiBase}/cart/${itemId}`,
          { product_qty: next },
          { withCredentials: true }
        );

        if (!syncMeta(res.data)) await fetchCartMeta();

        toast.success("Quantity updated.", { id: tId });
        return res.data;
      } catch (e) {
        if (delta) setTotalQty((c) => Math.max(0, c - delta)); // rollback
        const msg =
          e.response?.data?.message ||
          e.message ||
          "Failed to update quantity.";
        toast.error(msg, { id: tId });
        throw e;
      }
    });

  // +step
  const incQty = async (itemId, step = 1) =>
    withItemLock(itemId, async () => {
      const n = Math.max(1, Number(step) || 1);
      const tId = toast.loading("Increasing quantity…");
      setTotalQty((c) => c + n); // optimistic

      try {
        const res = await axios.patch(
          `${apiBase}/cart/${itemId}/increase`,
          null,
          { params: { step: n }, withCredentials: true }
        );

        if (!syncMeta(res.data)) await fetchCartMeta();

        toast.success("Quantity increased.", { id: tId });
        return res.data;
      } catch (e) {
        setTotalQty((c) => Math.max(0, c - n)); // rollback
        const msg =
          e.response?.data?.message ||
          e.message ||
          "Failed to increase quantity.";
        toast.error(msg, { id: tId });
        throw e;
      }
    });

  // -step
  const decQty = async (itemId, step = 1) =>
    withItemLock(itemId, async () => {
      const n = Math.max(1, Number(step) || 1);
      const tId = toast.loading("Decreasing quantity…");
      setTotalQty((c) => Math.max(0, c - n)); // optimistic

      try {
        const res = await axios.patch(
          `${apiBase}/cart/${itemId}/decrease`,
          null,
          { params: { step: n }, withCredentials: true }
        );

        if (!syncMeta(res.data)) await fetchCartMeta();

        toast.success("Quantity decreased.", { id: tId });
        return res.data;
      } catch (e) {
        setTotalQty((c) => c + n); // rollback
        const msg =
          e.response?.data?.message ||
          e.message ||
          "Failed to decrease quantity.";
        toast.error(msg, { id: tId });
        throw e;
      }
    });

  // ลบรายการ
  const removeItem = async (itemId, { currentQty } = {}) =>
    withItemLock(itemId, async () => {
      const tId = toast.loading("Removing item...");
      setTotalItems((c) => Math.max(0, c - 1)); // optimistic: บรรทัด -1 แน่นอน
      if (typeof currentQty === "number") {
        setTotalQty((c) => Math.max(0, c - Number(currentQty)));
      }

      try {
        const res = await axios.delete(`${apiBase}/cart/${itemId}`, {
          withCredentials: true,
        });

        if (!syncMeta(res.data)) await fetchCartMeta();

        toast.success("Item removed.", { id: tId });
        return res.data;
      } catch (e) {
        await fetchCartMeta(); // sync กลับ
        const msg =
          e.response?.data?.message || e.message || "Failed to remove item.";
        toast.error(msg, { id: tId });
        throw e;
      }
    });

  return (
    <CartContext.Provider
      value={{
        // state
        totalQty, // รวม “ชิ้น”
        totalItems, // รวม “รายการ”
        adding,
        isBusy,

        // actions
        fetchCartMeta: refreshCartMeta,
        addToCart,
        setQty,
        incQty,
        decQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
