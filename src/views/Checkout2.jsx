import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const API_URL = "http://localhost:3000";

const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(Math.max(0, Math.round(Number(n) || 0)));

export default function CheckoutStaticEmpty() {
  const nav = useNavigate();

  const [cart, setCart] = useState({ items: [], subtotal: 0, currency: "THB" });
  const [placing, setPlacing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // ⬅️ modal ยืนยันก่อนสร้างออเดอร์
  const { clearCartClient, fetchCartMeta } = useCart();

  const [addr, setAddr] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    line1: "",
    subdistrict: "",
    district: "",
    province: "",
    postalcode: "",
  });

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/orders/cart`, {
          withCredentials: true,
        });
        if (!ignore)
          setCart(data ?? { items: [], subtotal: 0, currency: "THB" });
      } catch (e) {
        if (e?.response?.status === 401) {
          nav("/login", { replace: true });
          return;
        }
        console.error("Load cart failed:", e);
        if (!ignore) setCart({ items: [], subtotal: 0, currency: "THB" });
      }
    })();
    return () => {
      ignore = true;
    };
  }, [nav]);

  const grandTotal = useMemo(() => cart.subtotal, [cart.subtotal]);
  const items = Array.isArray(cart?.items) ? cart.items : [];

  const filled = (v) => (v ? String(v).trim().length > 0 : false);
  const canProceed =
    items.length > 0 &&
    filled(addr.firstname) &&
    filled(addr.lastname) &&
    filled(addr.phone) &&
    filled(addr.line1) &&
    filled(addr.subdistrict) &&
    filled(addr.district) &&
    filled(addr.province) &&
    filled(addr.postalcode) &&
    !placing;

  const goToPaymentAsk = () => {
    if (!canProceed) return;
    setConfirmOpen(true);
  };

  const confirmCreateOrder = async () => {
    try {
      setPlacing(true);

      const payload = {
        address: {
          firstname: addr.firstname,
          lastname: addr.lastname,
          phone: addr.phone,
          subdistrict: addr.subdistrict,
          district: addr.district,
          province: addr.province,
          postalcode: addr.postalcode,
          line1: addr.line1,
        },
        payment: { method: "cod", status: "pending" }, // ตั้งต้นเป็น COD+pending
      };

      const { data } = await axios.post(`${API_URL}/orders`, payload, {
        withCredentials: true,
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });

      // เคลียร์ตะกร้าฝั่ง FE ด้วย (BE ล้างให้แล้ว)
      setCart({ items: [], subtotal: 0, currency: "THB" });
      clearCartClient();
      fetchCartMeta().catch(() => {});
      setConfirmOpen(false);
      // ไปหน้าเลือกวิธีจ่าย พร้อมพก orderId
      nav("/payment", { state: { orderId: data.order_id }, replace: true });
    } catch (e) {
      if (e?.response?.status === 401) {
        nav("/login", { replace: true });
        return;
      }
      alert(
        e?.response?.data?.message || e.message || "สร้างคำสั่งซื้อไม่สำเร็จ"
      );
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* LEFT: Address */}
        <section className="md:col-span-2 rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Shipping Information</h2>

          <form
            autoComplete="off"
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <Field label="First Name">
              <input
                className="rounded-lg border p-2"
                value={addr.firstname}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, firstname: e.target.value }))
                }
                placeholder="john"
              />
            </Field>
            <Field label="Last Name">
              <input
                className="rounded-lg border p-2"
                value={addr.lastname}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, lastname: e.target.value }))
                }
                placeholder="doe"
              />
            </Field>
            <Field label="Phone Number" span2>
              <input
                className="rounded-lg border p-2"
                value={addr.phone}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, phone: e.target.value }))
                }
                placeholder="0812345678"
                inputMode="tel"
              />
            </Field>
            <Field label="Address / Street Address" span2>
              <input
                className="rounded-lg border p-2"
                value={addr.line1}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, line1: e.target.value }))
                }
                placeholder="House Number / Village / Street"
              />
            </Field>
            <Field label="Sub-district">
              <input
                className="rounded-lg border p-2"
                value={addr.subdistrict}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, subdistrict: e.target.value }))
                }
              />
            </Field>
            <Field label="District">
              <input
                className="rounded-lg border p-2"
                value={addr.district}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, district: e.target.value }))
                }
              />
            </Field>
            <Field label="State/Province">
              <input
                className="rounded-lg border p-2"
                value={addr.province}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, province: e.target.value }))
                }
              />
            </Field>
            <Field label="Postal Code / Zip Code">
              <input
                className="rounded-lg border p-2"
                value={addr.postalcode}
                onChange={(e) =>
                  setAddr((a) => ({ ...a, postalcode: e.target.value }))
                }
                inputMode="numeric"
              />
            </Field>
          </form>
        </section>

        {/* RIGHT: Cart + total */}
        <aside className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
          <div className="space-y-3">
            {items.length === 0 && (
              <div className="text-gray-500">ไม่มีสินค้า</div>
            )}
            {items.map((it) => (
              <div
                key={String(it.product_id)}
                className="flex items-center gap-3 border-b pb-3 last:border-none"
              >
                <img
                  src={it.image}
                  alt={it.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-600">
                    color: {it.color} | Qty: {it.qty}
                  </div>
                </div>
                <div className="text-right">{formatTHB(it.line_total)}</div>
              </div>
            ))}
          </div>

          <div className="my-4 h-px bg-gray-200" />
          <div className="space-y-2">
            <Row label="Subtotal" value={formatTHB(cart.subtotal)} />
            <Row label="Shipping Fee" value="Free" />
            <Row bold label="Total" value={formatTHB(grandTotal)} />
          </div>

          <button
            onClick={goToPaymentAsk}
            disabled={!canProceed}
            className={`mt-4 w-full rounded-xl px-4 py-3 text-white transition ${
              canProceed
                ? "bg-black hover:opacity-90"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            {placing ? "Processing…" : "Select Payment Method"}
          </button>
          {!canProceed && (
            <p className="mt-2 text-center text-sm text-gray-500">
              Please complete all required fields before proceeding.
            </p>
          )}
        </aside>
      </div>

      {/* Modal ยืนยันสร้างออเดอร์ & ล้างตะกร้า */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Confirm your order?</h3>

            <div className="mt-3 text-sm">
              Total Payment:{" "}
              <span className="font-semibold">{formatTHB(grandTotal)}</span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border px-4 py-2"
                onClick={() => setConfirmOpen(false)}
                disabled={placing}
              >
                ยกเลิก
              </button>
              <button
                className={`rounded-lg px-4 py-2 text-white ${
                  placing ? "bg-gray-400" : "bg-black hover:opacity-90"
                }`}
                onClick={confirmCreateOrder}
                disabled={placing}
              >
                {placing ? "Creating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children, span2 = false }) {
  return (
    <div className={`flex flex-col gap-1 ${span2 ? "md:col-span-2" : ""}`}>
      <label className="text-sm text-gray-600">{label}</label>
      {children}
    </div>
  );
}
function Row({ label, value, bold }) {
  return (
    <div
      className={`flex items-center justify-between ${
        bold ? "text-base font-semibold" : "text-sm"
      }`}
    >
      <div className="text-gray-700">{label}</div>
      <div>{value}</div>
    </div>
  );
}
