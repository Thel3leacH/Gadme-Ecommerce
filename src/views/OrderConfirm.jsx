// src/views/OrderConfirm.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import success from "/src/assets/success.png";
import axios from "axios";

const API_URL = "http://localhost:3000";
const CHECK_IMG = success; //
const PLACEHOLDER_IMG = "/assets/placeholder.png";

const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(Math.max(0, Math.round(Number(n) || 0)));

export default function OrderConfirm() {
  const { orderId } = useParams();
  const nav = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/orders/${orderId}`, {
          withCredentials: true,
        });
        if (!ignore) setOrder(data);
      } catch (e) {
        if (e?.response?.status === 401) {
          nav("/login", { replace: true });
          return;
        }
        if (e?.response?.status === 404) {
          alert("Order not found.");
          nav("/", { replace: true });
          return;
        }
        console.error(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [orderId, nav]);

  const confirmedAt = useMemo(() => {
    if (!order?.createdAt) return "-";
    try {
      return new Date(order.createdAt).toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return String(order.createdAt);
    }
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-40 w-full bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }
  if (!order) return null;

  const n = (v) => Number(v || 0);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-4">
        {/* Success badge */}
        <div className="flex items-center gap-3">
          <img
            src={CHECK_IMG}
            alt="Order confirmed"
            className="h-12 w-12 rounded-full ring-4 ring-green-100 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold">Order Confirmed</h1>
            <p className="text-sm text-gray-600">
              Thank you for your purchase.
            </p>
          </div>
        </div>

        <p className="text-sm">Order ID: {order._id}</p>
        <p className="text-sm">Order Date: {confirmedAt}</p>

        {/* Order items with images */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Order Items</h2>

          {Array.isArray(order.order_items) && order.order_items.length > 0 ? (
            <div className="space-y-3">
              {order.order_items.map((it, idx) => (
                <div
                  key={it._id || idx}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={it.product_image || PLACEHOLDER_IMG}
                      alt={it.product_name}
                      className="h-12 w-12 rounded-lg object-cover border"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMG;
                      }}
                    />
                    <div>
                      <div className="font-medium">{it.product_name}</div>
                      <div className="text-xs text-gray-600">
                        color {it.product_color || "-"} • x{it.product_qty}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {formatTHB(n(it.product_subtotal))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No items</div>
          )}

          <div className="mt-3 pt-3 border-t text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>฿{n(order.order_subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>฿{n(order.order_shippingFee).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-฿{n(order.order_discount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>฿{n(order.order_total).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          <p className="text-sm">
            {order.order_shipping_address?.address_firstname}{" "}
            {order.order_shipping_address?.address_lastname} •{" "}
            {order.order_shipping_address?.address_phonenumber}
            <br />
            {order.order_shipping_address?.address_subdistrict},{" "}
            {order.order_shipping_address?.address_district},{" "}
            {order.order_shipping_address?.address_province}{" "}
            {order.order_shipping_address?.address_postalcode}
          </p>
        </div>

        {/* Payment block */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Payment</h2>
          <p className="text-sm">
            Payment: {order.order_payment?.method} (
            {order.order_payment?.status})
          </p>
          {order.order_payment?.transactionId && (
            <p className="text-xs text-gray-500">
              Txn: {order.order_payment.transactionId}
            </p>
          )}
        </div>

        <p className="text-xs">Current Status: {order.order_status}</p>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => nav("/", { replace: true })}
            className="rounded-xl border px-4 py-2 text-sm"
          >
            Go to Homepage Gadme
          </button>
        </div>
      </div>
    </div>
  );
}
