// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:3000";

export function CartProvider({ children, apiBase = API_URL }) {
  // รวม “ชิ้น”
  const [totalQty, setTotalQty] = useState(0);
  // รวม “รายการ”
  const [totalItems, setTotalItems] = useState(0);
  const [adding, setAdding] = useState(false);

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

  // init
  useEffect(() => {
    (async () => {
      try {
        await fetchCartMeta();
      } catch (e) {
        console.log("init cart meta failed:", e.response?.data || e.message);
      }
    })();
  }, [apiBase]);

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

      const name = payload?.product_name ?? "สินค้า";
      toast.success(`เพิ่ม ${name} x${inc} ลงตะกร้าแล้ว 🛒`, { id: tId });
      return res.data;
    } catch (e) {
      setTotalQty((c) => Math.max(0, c - inc)); // rollback
      const msg =
        e.response?.data?.message ||
        e.response?.data?.code ||
        e.message ||
        "เพิ่มลงตะกร้าไม่สำเร็จ";
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
        delta > 0 ? "กำลังเพิ่มจำนวน..." : "กำลังลดจำนวน..."
      );
      if (delta) setTotalQty((c) => Math.max(0, c + delta)); // optimistic

      try {
        const res = await axios.put(
          `${apiBase}/cart/${itemId}`,
          { product_qty: next },
          { withCredentials: true }
        );

        if (!syncMeta(res.data)) await fetchCartMeta();

        toast.success("อัปเดตจำนวนแล้ว", { id: tId });
        return res.data;
      } catch (e) {
        if (delta) setTotalQty((c) => Math.max(0, c - delta)); // rollback
        const msg =
          e.response?.data?.message || e.message || "อัปเดตจำนวนไม่สำเร็จ";
        toast.error(msg, { id: tId });
        throw e;
      }
    });

  // +step
  const incQty = async (itemId, step = 1) =>
    withItemLock(itemId, async () => {
      const n = Math.max(1, Number(step) || 1);
      const tId = toast.loading("กำลังเพิ่มจำนวน...");
      setTotalQty((c) => c + n); // optimistic

      try {
        const res = await axios.patch(
          `${apiBase}/cart/${itemId}/increase`,
          null,
          { params: { step: n }, withCredentials: true }
        );

        if (!syncMeta(res.data)) await fetchCartMeta();

        toast.success("เพิ่มจำนวนแล้ว", { id: tId });
        return res.data;
      } catch (e) {
        setTotalQty((c) => Math.max(0, c - n)); // rollback
        const msg =
          e.response?.data?.message || e.message || "เพิ่มจำนวนไม่สำเร็จ";
        toast.error(msg, { id: tId });
        throw e;
      }
    });

  // -step
  const decQty = async (itemId, step = 1) =>
    withItemLock(itemId, async () => {
      const n = Math.max(1, Number(step) || 1);
      const tId = toast.loading("กำลังลดจำนวน...");
      setTotalQty((c) => Math.max(0, c - n)); // optimistic

      try {
        const res = await axios.patch(
          `${apiBase}/cart/${itemId}/decrease`,
          null,
          { params: { step: n }, withCredentials: true }
        );

        if (!syncMeta(res.data)) await fetchCartMeta();

        toast.success("ลดจำนวนแล้ว", { id: tId });
        return res.data;
      } catch (e) {
        setTotalQty((c) => c + n); // rollback
        const msg =
          e.response?.data?.message || e.message || "ลดจำนวนไม่สำเร็จ";
        toast.error(msg, { id: tId });
        throw e;
      }
    });

  // ลบรายการ
  const removeItem = async (itemId, { currentQty } = {}) =>
    withItemLock(itemId, async () => {
      const tId = toast.loading("กำลังลบรายการ...");
      setTotalItems((c) => Math.max(0, c - 1)); // optimistic: บรรทัด -1 แน่นอน
      if (typeof currentQty === "number") {
        setTotalQty((c) => Math.max(0, c - Number(currentQty)));
      }

      try {
        const res = await axios.delete(`${apiBase}/cart/${itemId}`, {
          withCredentials: true,
        });

        if (!syncMeta(res.data)) await fetchCartMeta();

        toast.success("ลบรายการแล้ว", { id: tId });
        return res.data;
      } catch (e) {
        await fetchCartMeta(); // sync กลับ
        const msg =
          e.response?.data?.message || e.message || "ลบรายการไม่สำเร็จ";
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
