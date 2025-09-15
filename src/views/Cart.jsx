import React, { createContext, useContext, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// NOTE: เวอร์ชันนี้ "รันได้ทันที" ในแคนวาส เพราะไม่พึ่งพา path alias อย่าง @/components
// ผมทำ shadcn-like components แบบเบา ๆ ไว้ในไฟล์เดียว (Card, Button, Input, ฯลฯ)
// ถ้าจะเชื่อมกับโปรเจกต์จริง ให้ลบคอมโพเนนต์ด้านล่าง แล้ว import จาก shadcn/ui ของโปรเจกต์แทน

import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";

/***************************
 * Minimal UI (shadcn-like)
 ***************************/
const cx = (...c) => c.filter(Boolean).join(" ");

function Card({ className = "", children }) {
  return (
    <div
      className={cx(
        "rounded-2xl border bg-background text-foreground shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
function CardHeader({ className = "", children }) {
  return <div className={cx("p-4 md:p-6", className)}>{children}</div>;
}
function CardTitle({ className = "", children }) {
  return (
    <h3
      className={cx(
        "text-xl font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}
function CardContent({ className = "", children }) {
  return <div className={cx("p-4 md:p-6", className)}>{children}</div>;
}
function CardFooter({ className = "", children }) {
  return <div className={cx("p-4 md:p-6", className)}>{children}</div>;
}
function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const sizes = {
    default: "h-10 px-4 py-2 rounded-xl",
    icon: "h-10 w-10 rounded-xl",
    sm: "h-9 px-3 rounded-xl",
    lg: "h-11 px-6 rounded-xl",
  };
  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    outline: "border bg-background hover:bg-accent",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "hover:bg-accent",
  };
  return (
    <button
      className={cx(
        base,
        sizes[size] || sizes.default,
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
}
function Input({ className = "", ...props }) {
  return (
    <input
      className={cx(
        "flex h-10 w-full rounded-xl border bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  );
}
function Separator({ className = "", ...props }) {
  return <div className={cx("h-px w-full bg-muted", className)} {...props} />;
}
function ScrollArea({ className = "", children }) {
  return <div className={cx("overflow-y-auto", className)}>{children}</div>;
}
function Badge({ className = "", variant = "default", children }) {
  const styles = {
    default: "bg-primary/10 text-primary",
    secondary: "bg-muted text-foreground",
    outline: "border",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/***************************
 * Demo Cart Context (รันเดโมได้ทันที)
 ***************************/
const DemoCartContext = createContext(null);
export const useCart = () => useContext(DemoCartContext);

const initialItems = [
  {
    id: "1",
    variantId: "silver",
    selected: { color: "Silver" },
    qty: 1,
    unitPrice: 5555,
    currency: "THB",
    title: "Apple AirPods Max Silver",
    image:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp",
  },
  {
    id: "2",
    variantId: "white-20w",
    selected: { color: "White" },
    qty: 2,
    unitPrice: 1990,
    currency: "THB",
    title: "Apple iPhone Charger 20W",
    image:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp",
  },
];

function DemoCartProvider({ children }) {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id, variantId, qty) => {
    setItems((prev) => {
      const next = prev.map((x) =>
        x.id === id && (x.variantId || null) === (variantId || null)
          ? { ...x, qty }
          : x
      );
      return next.filter((x) => x.qty > 0);
    });
  };
  const remove = (id, variantId) => {
    setItems((prev) =>
      prev.filter(
        (x) => !(x.id === id && (x.variantId || null) === (variantId || null))
      )
    );
  };
  const clear = () => setItems([]);
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.unitPrice * it.qty, 0),
    [items]
  );

  const value = { items, updateQty, remove, clear, subtotal };
  return (
    <DemoCartContext.Provider value={value}>
      {children}
    </DemoCartContext.Provider>
  );
}

/***************************
 * Utils
 ***************************/
const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(n || 0);

/***************************
 * Page
 ***************************/
export default function CartPage() {
  return (
    <DemoCartProvider>
      <CartPageInner />
    </DemoCartProvider>
  );
}

function CartPageInner() {
  const { items, updateQty, remove, clear, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const itemCount = useMemo(
    () => items.reduce((s, it) => s + (it.qty || 0), 0),
    [items]
  );
  const shipping = useMemo(
    () => (subtotal >= 1000 || subtotal === 0 ? 0 : 49),
    [subtotal]
  );
  const total = useMemo(
    () => Math.max(0, subtotal + shipping - discount),
    [subtotal, shipping, discount]
  );

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return setDiscount(0);
    if (code === "SAVE50") setDiscount(50);
    else if (code === "SAVE10P") setDiscount(Math.floor(subtotal * 0.1));
    else setDiscount(0);
  };

  const handleInc = (id, variantId, qty) => updateQty(id, variantId, qty + 1);
  const handleDec = (id, variantId, qty) =>
    updateQty(id, variantId, Math.max(0, qty - 1));
  const handleInput = (id, variantId, v) => {
    const n = Math.max(0, Number(v) || 0);
    updateQty(id, variantId, n);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="mb-6 flex items-center gap-3">
        <ShoppingCart className="h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">ตะกร้าสินค้า</h1>
        <Badge variant="secondary" className="ml-1">
          {itemCount} รายการ
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT: รายการสินค้า */}
        <Card className="lg:col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">สินค้าในตะกร้า</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {items.length === 0 ? (
              <EmptyState />
            ) : (
              <ScrollArea className="max-h-[60vh]">
                <ul className="divide-y">
                  {items.map((it) => {
                    const key = `${it.id}-${it.variantId ?? "none"}`;
                    return (
                      <li
                        key={key}
                        className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-4 sm:w-1/2">
                          <img
                            src={it.image}
                            alt={it.title}
                            className="h-20 w-20 flex-shrink-0 rounded-xl object-cover ring-1 ring-black/5"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium leading-tight">
                              {it.title}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              {it.selected?.color && (
                                <Badge variant="outline">
                                  สี: {it.selected.color}
                                </Badge>
                              )}
                              {it.selected?.size && (
                                <Badge variant="outline">
                                  ไซส์: {it.selected.size}
                                </Badge>
                              )}
                              {it.variantId && (
                                <Badge variant="outline">
                                  รหัส: {it.variantId}
                                </Badge>
                              )}
                            </div>
                            <p className="mt-1 text-sm font-semibold">
                              {formatTHB(it.unitPrice)}
                            </p>
                          </div>
                        </div>

                        {/* Qty controls */}
                        <div className="sm:w-1/2 sm:justify-end sm:text-right">
                          <div className="flex items-center justify-between gap-4 sm:ml-auto sm:w-[360px]">
                            <div className="flex items-center rounded-full border">
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9 rounded-full"
                                onClick={() =>
                                  handleDec(it.id, it.variantId ?? null, it.qty)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                inputMode="numeric"
                                value={it.qty}
                                onChange={(e) =>
                                  handleInput(
                                    it.id,
                                    it.variantId ?? null,
                                    e.target.value
                                  )
                                }
                                className="h-9 w-14 border-0 text-center focus-visible:ring-0"
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9 rounded-full"
                                onClick={() =>
                                  handleInc(it.id, it.variantId ?? null, it.qty)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">
                                รวม
                              </p>
                              <p className="text-sm font-semibold">
                                {formatTHB(it.unitPrice * it.qty)}
                              </p>
                            </div>

                            <Button
                              variant="destructive"
                              className="rounded-full"
                              onClick={() =>
                                remove(it.id, it.variantId ?? null)
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> ลบ
                            </Button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              ส่งฟรีเมื่อยอดสั่งซื้อ ≥ {formatTHB(1000)}
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={clear}
              disabled={!items.length}
            >
              ล้างตะกร้าทั้งหมด
            </Button>
          </CardFooter>
        </Card>

        {/* RIGHT: สรุปยอด & Checkout */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">สรุปคำสั่งซื้อ</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span>จำนวนสินค้า</span>
                <span className="font-medium">{itemCount} ชิ้น</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>ยอดรวมสินค้า</span>
                <span className="font-medium">{formatTHB(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>ค่าจัดส่ง</span>
                <span className="font-medium">
                  {shipping === 0 ? "ฟรี" : formatTHB(shipping)}
                </span>
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">โค้ดส่วนลด</div>
                <div className="flex gap-2">
                  <Input
                    placeholder="เช่น SAVE50 หรือ SAVE10P"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button
                    onClick={applyCoupon}
                    variant="secondary"
                    className="whitespace-nowrap"
                  >
                    ใช้โค้ด
                  </Button>
                </div>
                {!!discount && (
                  <p className="mt-2 text-right text-sm text-green-600 dark:text-green-400">
                    - {formatTHB(discount)}
                  </p>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold">ยอดสุทธิ</span>
                <span className="font-semibold">{formatTHB(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                * ราคาสินค้าอาจมีการเปลี่ยนแปลง โปรดตรวจสอบอีกครั้งในขั้นตอน
                Checkout
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="h-11 w-full rounded-full"
                disabled={!items.length}
              >
                <Link to="/checkout">ดำเนินการชำระเงิน</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="rounded-2xl border bg-muted/30 p-6">
        <ShoppingCart className="mx-auto h-10 w-10" />
      </div>
      <div>
        <p className="text-base font-medium">ยังไม่มีสินค้าในตะกร้า</p>
        <p className="mt-1 text-sm text-muted-foreground">
          เลือกสินค้าที่ชอบแล้วกลับมาที่นี่อีกครั้ง
        </p>
      </div>
      <Button className="rounded-full">ไปเลือกสินค้า</Button>
    </div>
  );
}
