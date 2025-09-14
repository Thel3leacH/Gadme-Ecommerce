import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartContext = createContext(null);
const API_URL = "http://localhost:3000";

export function CartProvider({ children }) {
  const [totalQty, setTotalQty] = useState(0);

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
    }
  };

  return (
    <CartContext.Provider value={{ totalQty, addToCart, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
