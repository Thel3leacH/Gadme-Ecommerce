import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartContext = createContext(null);
const API_URL = "http://localhost:3000";

export function CartProvider({ children }) {
  const [totalQty, setTotalQty] = useState(0);
  const [adding, setAdding] = useState(false);

  // แยก count ออกมาจาก response ให้รอดหลายฟอร์แมต
  const extractCount = (data) => {
    if (typeof data?.count === "number") return data.count;
    if (typeof data?.totalQty === "number") return data.totalQty;
    if (Array.isArray(data?.count) && data.count[0]?.totalQty != null)
      return data.count[0].totalQty;
    if (Array.isArray(data) && data[0]?.totalQty != null)
      return data[0].totalQty;
    return 0;
  };

  const busyRef = useRef(new Set());
  const withItemLock = async (key, fn) => {
    if (busyRef.current.has(key)) return; // ถ้ายังประมวลผลรายการนี้อยู่ ให้กันคลิกซ้ำ
    busyRef.current.add(key);
    try {
      return await fn();
    } finally {
      busyRef.current.delete(key);
    }
  };

  const fetchCartCount = async () => {
    const res = await axios.get(`${API_URL}/cart/count`, {
      withCredentials: true,
    });
    setTotalQty(extractCount(res.data));
  };

  // sync ตอนเข้าเว็บ
  useEffect(() => {
    (async () => {
      try {
        await fetchCartCount();
      } catch (e) {
        console.log("GET /cart/count failed", e.response?.data || e.message);
      }
    })();
  }, []);

  // Add to cart + hot toast
  const addToCart = async (payload) => {
    const inc = payload?.product_qty ?? 1;

    // 🔔 เริ่มด้วย loading toast + optimistic
    const tId = toast.loading("กำลังเพิ่มลงตะกร้า...");
    setTotalQty((c) => c + inc);

    try {
      const res = await axios.post(`${API_URL}/cart`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      // ถ้า server ส่ง count/totalQty มาก็ sync ให้ตรง
      const serverCount = extractCount(res.data);
      if (serverCount > 0) setTotalQty(serverCount);
      else await fetchCartCount();

      // 🔔 อัปเดต toast เป็นสำเร็จ (ใช้ id เดิม)
      const name = payload?.product_name ?? "สินค้า";
      toast.success(`เพิ่ม ${name} x${inc} ลงตะกร้าแล้ว 🛒`, { id: tId });

      return res.data;
    } catch (e) {
      // rollback และแจ้ง error
      setTotalQty((c) => Math.max(0, c - inc));
      const msg =
        e.response?.data?.message ||
        e.response?.data?.code ||
        e.message ||
        "เพิ่มลงตะกร้าไม่สำเร็จ";
      toast.error(msg, { id: tId });
      throw e;
    } finally {
      setAdding(false); // ปลดล็อกปุ่มเมื่อเสร็จ
    }
  };

  const setQty = async (itemId, nextQty, { currentQty } = {}) =>
    withItemLock(itemId, async () => {
      const delta =
        typeof currentQty === "number"
          ? Number(nextQty) - Number(currentQty)
          : 0;
      const tId =
        delta > 0
          ? toast.loading("กำลังเพิ่มจำนวน...")
          : toast.loading("กำลังลดจำนวน...");
      if (delta) setTotalQty((c) => Math.max(0, c + delta));

      try {
        const res = await axios.put(
          `${API_URL}/cart/${itemId}`,
          { product_qty: nextQty },
          { withCredentials: true }
        );
        const serverCount = extractCount(res.data);
        if (serverCount > 0) setTotalQty(serverCount);
        else await fetchCartCount();
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

  // Increase quantity by step (default 1)
  const incQty = async (itemId, step = 1) => {
    const tId = toast.loading("กำลังเพิ่มจำนวน...");
    setTotalQty((c) => c + Number(step)); // optimistic
    try {
      const res = await axios.patch(
        `${API_URL}/cart/${itemId}/increase`,
        null,
        {
          params: { step },
          withCredentials: true,
        }
      );
      const serverCount = extractCount(res.data);
      if (serverCount > 0) setTotalQty(serverCount);
      else await fetchCartCount();
      toast.success("เพิ่มจำนวนแล้ว", { id: tId });
      return res.data;
    } catch (e) {
      setTotalQty((c) => Math.max(0, c - Number(step))); // rollback
      const msg =
        e.response?.data?.message || e.message || "เพิ่มจำนวนไม่สำเร็จ";
      toast.error(msg, { id: tId });
      throw e;
    }
  };

  // Decrease quantity by step (default 1)
  const decQty = async (itemId, step = 1) => {
    const tId = toast.loading("กำลังลดจำนวน...");
    setTotalQty((c) => Math.max(0, c - Number(step))); // optimistic (ขั้นต่ำ 0)
    try {
      const res = await axios.patch(
        `${API_URL}/cart/${itemId}/decrease`,
        null,
        {
          params: { step },
          withCredentials: true,
        }
      );
      const serverCount = extractCount(res.data);
      if (serverCount > 0) setTotalQty(serverCount);
      else await fetchCartCount();
      toast.success("ลดจำนวนแล้ว", { id: tId });
      return res.data;
    } catch (e) {
      setTotalQty((c) => c + Number(step)); // rollback
      const msg = e.response?.data?.message || e.message || "ลดจำนวนไม่สำเร็จ";
      toast.error(msg, { id: tId });
      throw e;
    }
  };

  const removeItem = async (itemId, { currentQty } = {}) => {
    const tId = toast.loading("กำลังลบรายการ...");
    if (typeof currentQty === "number") {
      setTotalQty((c) => Math.max(0, c - Number(currentQty))); // optimistic
    }

    try {
      const res = await axios.delete(`${API_URL}/cart/${itemId}`, {
        withCredentials: true,
      });

      // sync ตัวเลขจาก server (รองรับหลายฟอร์แมต)
      const serverCount = extractCount(res.data);
      if (serverCount >= 0) setTotalQty(serverCount);
      else await fetchCartCount();

      toast.success("ลบรายการแล้ว", { id: tId });
      return res.data;
    } catch (e) {
      // ถ้าพลาด ให้ซิงก์นับใหม่แทน (โรลแบ็กอาจไม่รู้ qty ที่แน่ชัด)
      await fetchCartCount();
      const msg = e.response?.data?.message || e.message || "ลบรายการไม่สำเร็จ";
      toast.error(msg, { id: tId });
      throw e;
    }
  };

  return (
    <CartContext.Provider
      value={{
        adding,
        totalQty,
        addToCart,
        fetchCartCount,
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
