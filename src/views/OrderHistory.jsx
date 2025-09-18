import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // e.g. https://api.example.com
const PLACEHOLDER_IMG = "/assets/placeholder.png";

const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(Math.max(0, Math.round(Number(n) || 0)));

const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-amber-100 text-amber-800",
    paid: "bg-emerald-100 text-emerald-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-rose-100 text-rose-800",
    refunded: "bg-slate-100 text-slate-800",
  };
  const klass = map[status] || "bg-gray-100 text-gray-800";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${klass}`}>
      {status || "-"}
    </span>
  );
};

const methodLabel = (m) => {
  if (!m) return "-";
  const map = {
    credit_card: "Credit Card",
    bank_transfer: "Bank Transfer",
    promptpay_qr: "PromptPay QR",
    cod: "COD",
  };
  return map[m] || m;
};

const PaymentBadge = ({ method, status }) => {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
      {method ? `${methodLabel(method)} • ${status || "-"}` : "-"}
    </span>
  );
};

export default function OrderHistory() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((total || 0) / limit)),
    [total, limit]
  );

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setErrorMsg("");
        // ✅ fetch with credentials
        const { data } = await axios.get(`${API_URL}/orderhistory/my`, {
          params: { limit, page },
          withCredentials: true,
        });
        if (ignore) return;
        setOrders(Array.isArray(data?.orders) ? data.orders : []);
        setTotal(Number(data?.total || 0));
      } catch (e) {
        if (e?.response?.status === 401) {
          nav("/login", { replace: true });
          return;
        }
        setErrorMsg(
          e?.response?.data?.message ||
            "An error occurred while fetching your order history."
        );
        console.error(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [page, limit, nav]);

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-4">
              <div className="h-5 w-80 bg-gray-100 rounded animate-pulse mb-3" />
              <div className="h-24 w-full bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <h1 className="text-2xl font-bold">Order History</h1>

        {errorMsg && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-700 text-sm">
            {errorMsg}
          </div>
        )}

        {!orders.length && !errorMsg ? (
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-gray-600">No orders yet</p>
            <Link
              to="/"
              className="inline-block mt-3 rounded-xl border px-4 py-2 text-sm"
            >
              Back to Home
            </Link>
          </div>
        ) : null}

        {orders.map((order) => {
          const created = (() => {
            try {
              return new Date(order.createdAt).toLocaleString("th-TH", {
                dateStyle: "medium",
                timeStyle: "short",
              });
            } catch {
              return String(order.createdAt || "-");
            }
          })();

          const items = Array.isArray(order.order_items)
            ? order.order_items
            : [];
          const firstImg =
            items?.[0]?.product_image || items?.[0]?.image || PLACEHOLDER_IMG;

          return (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow p-4 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-sm text-gray-500">
                    Order ID: <span className="font-mono">{order._id}</span>
                  </div>
                  <div className="text-sm text-gray-500">Date: {created}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={order.order_status} />
                  <PaymentBadge
                    method={order.order_payment?.method}
                    status={order.order_payment?.status}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto">
                <img
                  src={firstImg}
                  alt="first-item"
                  className="h-14 w-14 rounded-lg object-cover border"
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
                />
                <div className="text-sm text-gray-700">
                  {items.length > 0 ? (
                    <>
                      <div className="font-medium">
                        {items[0].product_name || items[0].name || "Item"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {items.length > 1
                          ? `and ${items.length - 1} more item(s)`
                          : items[0].product_color
                          ? `Color ${items[0].product_color} • x${items[0].product_qty}`
                          : `x${items[0].product_qty}`}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-500">No items</div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t">
                <div className="text-lg font-bold">
                  Total: {formatTHB(order.order_total)}
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/orderhistory/${order._id}`}
                    className="rounded-xl border px-3 py-2 text-sm"
                  >
                    View details
                  </Link>
                  <Link to="/" className="rounded-xl border px-3 py-2 text-sm">
                    Shop more
                  </Link>
                </div>
              </div>

              <details className="mt-1 rounded-xl bg-gray-50 p-3 text-sm">
                <summary className="cursor-pointer select-none text-gray-700">
                  Show items & shipping address
                </summary>

                <div className="mt-3 space-y-2">
                  {items.length ? (
                    items.map((it, idx) => (
                      <div
                        key={it._id || idx}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={it.product_image || PLACEHOLDER_IMG}
                            alt={it.product_name}
                            className="h-12 w-12 rounded-lg object-cover border"
                            onError={(e) =>
                              (e.currentTarget.src = PLACEHOLDER_IMG)
                            }
                          />
                          <div>
                            <div className="font-medium">
                              {it.product_name || "Item"}
                            </div>
                            <div className="text-xs text-gray-600">
                              Color {it.product_color || "-"} • x
                              {it.product_qty}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {formatTHB(it.product_subtotal)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No items</div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t space-y-1">
                  <div className="flex justify-between">
                    <span>Items subtotal</span>
                    <span>
                      ฿{Number(order.order_subtotal || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping fee</span>
                    <span>
                      ฿{Number(order.order_shippingFee || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>
                      -฿{Number(order.order_discount || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Amount due</span>
                    <span>
                      ฿{Number(order.order_total || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="font-semibold mb-1">Shipping address</div>
                  <div className="text-sm text-gray-700">
                    {order.order_shipping_address?.address_firstname}{" "}
                    {order.order_shipping_address?.address_lastname} •{" "}
                    {order.order_shipping_address?.address_phonenumber}
                    <br />
                    {order.order_shipping_address?.address_subdistrict},{" "}
                    {order.order_shipping_address?.address_district},{" "}
                    {order.order_shipping_address?.address_province}{" "}
                    {order.order_shipping_address?.address_postalcode}
                  </div>
                </div>
              </details>
            </div>
          );
        })}

        {orders.length > 0 && (
          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages} • {total} orders total
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <button
                className="rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
