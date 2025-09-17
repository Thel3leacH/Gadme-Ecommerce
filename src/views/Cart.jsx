import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function CartList() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiSubtotal, setApiSubtotal] = useState(null);
  const { totalQty, totalItems, setQty, removeItem: removeItemCtx } = useCart();
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [activeRemovingId, setActiveRemovingId] = useState(null);
  const [going, setGoing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/cart`, {
          withCredentials: true,
        });
        // If your API returns { carts: [...] } then use: setCarts(res.data.carts)
        const { cartItems, subtotal, count } = res.data ?? {};
        setCarts(Array.isArray(cartItems) ? cartItems : []);
        setApiSubtotal(typeof subtotal === "number" ? subtotal : null);
      } catch (e) {
        if (e.name !== "CanceledError") setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Helpers to tolerate both flat/nested shapes
  const pickProduct = (item) => (item?.product_id ? item.product_id : item);

  const formatTHB = (n) =>
    new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(Number(n || 0));

  const computedSubtotal = useMemo(() => {
    return carts.reduce((s, i) => {
      const p = pickProduct(i);
      const price = Number(i?.product_price ?? p?.product_price ?? 0);
      const qty = Number(i?.product_qty ?? 0);
      return s + price * qty;
    }, 0);
  }, [carts]);

  const hasInvalidItem = useMemo(
    () => carts?.some((it) => !it?.product_qty || it.product_qty < 1),
    [carts]
  );
  const canCheckout = useMemo(
    () => (carts?.length ?? 0) > 0 && !hasInvalidItem && !going,
    [carts, hasInvalidItem, going]
  );

  const onCheckout = () => {
    setGoing(true);
    navigate("/checkout");
  };

  const patchQuantity = async (id, nextQty, currentQty) => {
    const backup = carts;
    setCarts((prev) =>
      prev.map((it) => (it._id === id ? { ...it, product_qty: nextQty } : it))
    );
    try {
      await setQty(id, nextQty, { currentQty });
      setApiSubtotal(null);
    } catch (e) {
      // rollback UI list
      setCarts(backup);
    }
  };

  const removeItem = async (id, currentQty) => {
    if (deleteBusy) return;

    const backup = carts;
    setDeleteBusy(true);
    setActiveRemovingId(id);

    setCarts((prev) => prev.filter((it) => it._id !== id));

    try {
      await removeItemCtx(id, { currentQty }); // ให้ Context จัดการ count/toast
      setApiSubtotal(null);
    } catch (e) {
      setCarts(backup);
      console.error("remove failed", e);
    } finally {
      setTimeout(() => {
        setDeleteBusy(false);
        setActiveRemovingId(null);
      }, 600);
    }
  };
  const count = totalItems ?? carts?.length ?? 0;
  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto max-w-6xl px-4 py-6 flex-1 w-full">
        <h1 className="mb-5 text-2xl font-bold flex items-center gap-2">
          🛒 My Cart
          {count > 0 && (
            <span className="rounded-full border px-2 py-0.5 text-sm">
              {count.toLocaleString("en-US")} {count === 1 ? "item" : "items"}
            </span>
          )}
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT: Cart List */}
          <div className="lg:col-span-2">
            {loading && (
              <div className="space-y-3">
                <div className="h-24 w-full animate-pulse rounded-xl bg-gray-200" />
                <div className="h-24 w-full animate-pulse rounded-xl bg-gray-200" />
                <div className="h-24 w-full animate-pulse rounded-xl bg-gray-200" />
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                โหลดข้อมูลไม่สำเร็จ
              </div>
            )}

            {!loading && !error && carts.length === 0 && (
              <div className="rounded-lg border bg-white p-6 text-center text-gray-600">
                ไม่มีสินค้าในตะกร้า
              </div>
            )}

            <ul className="space-y-4">
              {carts.map((item) => {
                const p = pickProduct(item);
                const price = Number(
                  item?.product_price ?? p?.product_price ?? 0
                );
                const qty = Number(item?.product_qty ?? 0);

                return (
                  <li
                    key={item._id}
                    className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
                  >
                    {/* Image */}
                    <img
                      src={p?.product_image}
                      alt={p?.product_name || "product image"}
                      className="h-20 w-20 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/80x80?text=No+Image";
                      }}
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="text-base font-semibold leading-tight">
                            {p?.product_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {p?.product_color}
                          </p>
                        </div>
                        <div className="text-right text-sm font-medium">
                          {formatTHB(price)}
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          className="h-8 w-8 rounded-full border bg-white text-xl leading-none hover:bg-gray-50"
                          onClick={() =>
                            qty > 1 && patchQuantity(item._id, qty - 1, qty)
                          }
                          aria-label="decrease"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm">
                          {qty}
                        </span>
                        <button
                          className="h-8 w-8 rounded-full border bg-white text-xl leading-none hover:bg-gray-50"
                          onClick={() => patchQuantity(item._id, qty + 1, qty)}
                          aria-label="increase"
                        >
                          +
                        </button>

                        <button
                          disabled={deleteBusy}
                          aria-disabled={deleteBusy}
                          onClick={() => removeItem(item._id, item.product_qty)}
                          className={`ms-auto inline-flex items-center justify-center rounded-full p-2 transition
    ${deleteBusy ? "opacity-60 pointer-events-none" : "hover:bg-red-50"}
    text-red-600 hover:text-red-700`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT: Summary */}
          {carts.length > 0 && (
            <aside className="lg:col-span-1">
              <div className="rounded-xl border bg-white p-4 shadow-sm lg:sticky lg:top-24">
                <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>

                <div className="mb-3 flex items-center justify-between text-sm text-gray-600">
                  <span>Product Quantity</span>
                  <span>{totalQty ?? carts.length} Item</span>
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Subtotal price incl. VAT{" "}
                  </span>
                  <span className="text-base font-semibold">
                    {formatTHB(apiSubtotal ?? computedSubtotal)}
                  </span>
                </div>

                {/* Shipping ฟรี (ขวา / ใต้ยอดรวม) */}
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M3 5a2 2 0 0 1 2-2h8v9h-2a3 3 0 0 0-3 3v2H7a2 2 0 1 1-4 0h1v-2a2 2 0 0 1 2-2h1V5H5a2 2 0 0 1-2-2Zm11 0h3.586A2 2 0 0 1 19 5.586l2 2A2 2 0 0 1 22 8.414V15h-1a2.999 2.999 0 0 0-5.815.5H13V5Zm5 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 18a2 2 0 1 0 .001 0H7Z" />
                    </svg>
                    Shipping
                  </span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>

                {/* ปุ่มต่างๆ */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={onCheckout}
                    disabled={!canCheckout}
                    aria-disabled={!canCheckout}
                    aria-busy={going}
                    className={`w-full rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-black/90
      ${!canCheckout ? "opacity-60 cursor-not-allowed hover:bg-black" : ""}`}
                  >
                    {going ? "Proceeding to checkout…" : "Checkout"}
                  </button>
                </div>

                {hasInvalidItem && (
                  <p className="text-xs text-rose-600">
                    มีรายการที่จำนวนไม่ถูกต้อง กรุณาตรวจสอบจำนวนสินค้าอีกครั้ง
                  </p>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
