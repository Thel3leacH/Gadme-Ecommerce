// src/views/PaymentOptions.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import qrcode from "/src/assets/qrcode.jpg";

const API_URL = "http://localhost:3000";
const QR_IMAGE_URL = qrcode;

const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(Math.max(0, Math.round(Number(n) || 0)));

export default function PaymentOptions() {
  const nav = useNavigate();
  const { state } = useLocation();
  const orderId = state?.orderId;

  const [method, setMethod] = useState(null); // 'cod' | 'qr'
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) {
      nav("/checkout", { replace: true });
    }
  }, [orderId, nav]);

  useEffect(() => {
    if (!orderId) return;
    let ignore = false;
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/orders/${orderId}`, {
          withCredentials: true,
        });
        if (!ignore) setOrder(data);
      } catch (e) {
        if (e?.response?.status === 401) {
          nav("/login", { replace: true });
          return;
        }
        console.error(e);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [orderId, nav]);

  const items = Array.isArray(order?.order_items) ? order.order_items : [];
  const grandTotal = useMemo(() => order?.order_total ?? 0, [order]);

  const canConfirm = !!method && !!orderId && !processing;

  const confirmPayment = async () => {
    if (!canConfirm) return;
    setProcessing(true);
    try {
      if (method === "cod") {
        await axios.patch(
          `${API_URL}/orders/${orderId}/payment`,
          { method: "cod", status: "pending" },
          { withCredentials: true }
        );
      } else if (method === "qr") {
        await axios.patch(
          `${API_URL}/orders/${orderId}/payment`,
          {
            method: "bank_transfer",
            status: "paid",
            transactionId: `qr-demo-${Date.now()}`,
          },
          { withCredentials: true }
        );
      }
      nav(`/orderconfirm/${orderId}`, { replace: true });
    } catch (e) {
      if (e?.response?.status === 401) {
        nav("/login", { replace: true });
        return;
      }
      alert(e?.response?.data?.message || e.message || "Transaction Failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Select Payment Method</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* LEFT: เลือกวิธีชำระ */}
        <section className="md:col-span-2 rounded-2xl border p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-medium">Payment Option</h2>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
            <input
              type="radio"
              name="method"
              value="cod"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            <div>
              <div className="font-medium">Cash on Delivery (COD)</div>
              <div className="text-sm text-gray-600">Pay upon Delivery</div>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
            <input
              type="radio"
              name="method"
              value="qr"
              checked={method === "qr"}
              onChange={() => setMethod("qr")}
            />
            <div>
              <div className="font-medium">Payment via QR Code</div>
              <div className="text-sm text-gray-600">
                Pay via QR Code (Thai QR PromptPay)
              </div>
            </div>
          </label>

          {method === "qr" && (
            <div className="rounded-xl border p-4">
              <div className="mb-2 text-sm text-gray-600"></div>
              <img
                src={QR_IMAGE_URL}
                alt="QR code"
                className="mx-auto h-120 w-300 rounded-lg object-contain border"
              />
              <div className="mt-3 text-center text-sm text-gray-600">
                Total Amount:{" "}
                <span className="font-semibold">{formatTHB(grandTotal)}</span>
              </div>
            </div>
          )}
        </section>

        {/* RIGHT: สรุปรายการ + ปุ่มยืนยันอยู่ล่างสุด */}
        <aside className="rounded-2xl border p-5 shadow-sm flex flex-col">
          {/* เนื้อหาสรุปทั้งหมดให้กินพื้นที่ที่เหลือ */}
          <div className="flex-1">
            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>

            <div className="space-y-3">
              {items.map((it) => (
                <div
                  key={String(it._id || it.product_id)}
                  className="flex items-center gap-3 border-b pb-3 last:border-none"
                >
                  <img
                    src={it.product_image}
                    alt={it.product_name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm">{it.product_name}</div>
                    <div className="text-xs text-gray-600">
                      color {it.product_color} · x{it.product_qty}
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    {formatTHB(it.product_subtotal)}
                  </div>
                </div>
              ))}
            </div>

            <div className="my-4 h-px bg-gray-200" />

            <Row
              label="Subtotal"
              value={formatTHB(order?.order_subtotal ?? 0)}
            />
            <Row label="Shipping Fee" value="Free" />
            <Row
              bold
              label="Total"
              value={formatTHB(order?.order_total ?? 0)}
            />
          </div>

          {/* ปุ่มจะถูกดันไปอยู่ล่างสุดของ aside เสมอ */}
          <button
            onClick={confirmPayment}
            disabled={!canConfirm}
            className={`mt-4 w-full rounded-xl px-4 py-3 text-white ${
              canConfirm
                ? "bg-black hover:opacity-90"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {processing
              ? "Confirming......"
              : method === "qr"
              ? "Confirm Payment (QR Code)"
              : "Confirm Order (COD)"}
          </button>
        </aside>
      </div>
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
