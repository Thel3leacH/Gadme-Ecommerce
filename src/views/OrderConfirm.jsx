import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  CalendarClock,
  Receipt,
  MapPin,
  CreditCard,
  Truck,
  Package,
  Printer,
  Download,
  Copy,
  Mail,
  Phone,
  BadgePercent,
} from "lucide-react";

// --- Helpers ---
const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(n);

const fmtDateTH = (d) =>
  new Intl.DateTimeFormat("th-TH", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  }).format(d);

// --- Mock order data (replace with real data/props as needed) ---
const mockOrder = {
  id: "ORD-2509-8F4C27",
  createdAt: new Date(),
  payment: {
    method: "PromptPay QR",
    status: "paid", // paid | pending | failed | refunded
    transactionId: "TXN-8D3A4-TH",
    last4: "—", // for cards, e.g. 1234
  },
  fulfillment: {
    status: "processing", // processing | packed | shipped | delivered
    carrier: "Kerry Express",
    etaDays: "1–2 วันทำการ",
  },
  contact: {
    email: "customer@example.com",
    phone: "+66 81 234 5678",
  },
  shippingAddress: {
    name: "สมชาย ใจดี",
    line1: "99/12 ซอยสุขุมวิท 42",
    line2: "แขวงพระโขนง เขตคลองเตย",
    city: "กรุงเทพฯ",
    postalCode: "10110",
  },
  billingAddress: {
    name: "สมชาย ใจดี",
    line1: "99/12 ซอยสุขุมวิท 42",
    line2: "แขวงพระโขนง เขตคลองเตย",
    city: "กรุงเทพฯ",
    postalCode: "10110",
    taxId: "0105559999999", // เลขผู้เสียภาษี (ถ้ามี)
  },
  items: [
    {
      sku: "NT-HE-0101-BL",
      title: "NovaTech Headphones X",
      options: { color: "Black" },
      qty: 1,
      price: 1990,
      image: "https://picsum.photos/seed/gadget-101-black/120/120",
    },
    {
      sku: "AR-PB-20000-BU",
      title: "Aurora Power Bank 20,000mAh",
      options: { color: "Blue" },
      qty: 2,
      price: 1290,
      image: "https://picsum.photos/seed/powerbank-20000/120/120",
    },
    {
      sku: "VT-C-1M-GY",
      title: "Volt USB‑C Cable 1m",
      options: { color: "Gray" },
      qty: 3,
      price: 190,
      image: "https://picsum.photos/seed/usb-c-cable/120/120",
    },
  ],
  discount: { code: "WELCOME150", amount: 150 },
  shippingFee: 50,
  vatRate: 0.07,
  notes:
    "ขอบคุณที่สั่งซื้อกับเรา! เราจะอัปเดตสถานะการจัดส่งให้ทราบทางอีเมลและ SMS เมื่อพัสดุออกจากคลังสินค้า.",
};

function computeTotals(order) {
  const subtotal = order.items.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = order.discount?.amount ?? 0;
  const shipping = order.shippingFee ?? 0;
  const taxable = subtotal - discount + shipping;
  const vat = Math.round(taxable * order.vatRate);
  const grand = taxable + vat;
  return { subtotal, discount, shipping, vat, grand };
}

// --- Tiny shadcn-like primitives (local) ---
function Card({ className = "", children }) {
  return (
    <div
      className={
        "rounded-2xl border border-slate-200 bg-white shadow-sm " + className
      }
    >
      {children}
    </div>
  );
}
function CardHeader({ className = "", children }) {
  return <div className={"p-5 " + className}>{children}</div>;
}
function CardContent({ className = "", children }) {
  return <div className={"px-5 pb-5 " + className}>{children}</div>;
}
function CardFooter({ className = "", children }) {
  return <div className={"px-5 py-4 border-t " + className}>{children}</div>;
}
function Badge({ variant = "default", children, className = "" }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium";
  const map = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-800",
    outline: "border border-slate-200 text-slate-700 bg-white",
  };
  return (
    <span className={[base, map[variant], className].join(" ")}>
      {children}
    </span>
  );
}
function Separator() {
  return <div className="h-px w-full bg-slate-200" />;
}

// --- Timeline step ---
function Step({ icon: Icon, label, active }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={
          "h-8 w-8 shrink-0 rounded-full border flex items-center justify-center " +
          (active
            ? "bg-emerald-50 border-emerald-300"
            : "bg-white border-slate-300")
        }
      >
        <Icon
          className={
            "h-4 w-4 " + (active ? "text-emerald-600" : "text-slate-400")
          }
        />
      </div>
      <div
        className={"text-sm " + (active ? "text-slate-900" : "text-slate-500")}
      >
        {label}
      </div>
    </div>
  );
}

// --- Main Page ---
export default function OrderConfirmPage({ order = mockOrder }) {
  const [copied, setCopied] = useState(false);
  const totals = useMemo(() => computeTotals(order), [order]);

  const steps = [
    { label: "รับคำสั่งซื้อ", icon: Receipt },
    { label: "ชำระเงินสำเร็จ", icon: CreditCard },
    { label: "แพ็คสินค้า", icon: Package },
    { label: "กำลังจัดส่ง", icon: Truck },
    { label: "จัดส่งสำเร็จ", icon: CheckCircle2 },
  ];
  const activeIdx =
    order.fulfillment.status === "processing"
      ? 1
      : order.fulfillment.status === "packed"
      ? 2
      : order.fulfillment.status === "shipped"
      ? 3
      : order.fulfillment.status === "delivered"
      ? 4
      : 0;

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  const printPage = () => window.print();

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Teal Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #14b8a6 100%)",
          backgroundSize: "100% 100%",
        }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-50 p-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                คำสั่งซื้อเสร็จสมบูรณ์
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                เราได้ส่งอีเมลยืนยันไปที่{" "}
                <span className="font-medium">{order.contact.email}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={printPage}
              className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" /> พิมพ์ใบเสร็จ
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm hover:bg-slate-50"
              onClick={() =>
                alert(
                  "สำหรับดาวน์โหลด PDF โปรดใช้ปุ่มพิมพ์ แล้วเลือก Save as PDF"
                )
              }
            >
              <Download className="h-4 w-4" /> ดาวน์โหลด PDF
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-sm shadow-sm hover:bg-slate-800"
            >
              <Link to="/productlists">ซื้อสินค้าต่อ</Link>
            </button>
          </div>
        </motion.div>

        {/* Success sparkle dots */}
        <div className="pointer-events-none relative -mt-4 mb-4 h-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/4 top-0 h-2 w-2 rounded-full bg-emerald-400"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute left-1/2 top-0 h-2 w-2 rounded-full bg-teal-400"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-3/4 top-0 h-2 w-2 rounded-full bg-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT: รายการสินค้า */}
          <Card className="lg:col-span-8">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-slate-500" />
                  <h2 className="text-lg font-semibold">
                    รายละเอียดคำสั่งซื้อ
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">เลขที่:</span>
                  <code className="rounded-md bg-slate-100 px-2 py-1 text-slate-700">
                    {order.id}
                  </code>
                  <button
                    onClick={copyOrderId}
                    className="inline-flex items-center gap-1 rounded-md border bg-white px-2 py-1 text-xs hover:bg-slate-50"
                  >
                    <Copy className="h-3.5 w-3.5" />{" "}
                    {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                  </button>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <CalendarClock className="h-4 w-4" />
                <span>สั่งซื้อเมื่อ: {fmtDateTH(order.createdAt)}</span>
                <Badge variant="success" className="ml-2">
                  ชำระเงินแล้ว
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600">
                      <th className="px-5 py-3 text-left font-medium">
                        สินค้า
                      </th>
                      <th className="px-5 py-3 text-left font-medium">
                        ตัวเลือก
                      </th>
                      <th className="px-5 py-3 text-right font-medium">
                        ต่อชิ้น
                      </th>
                      <th className="px-5 py-3 text-right font-medium">
                        จำนวน
                      </th>
                      <th className="px-5 py-3 text-right font-medium">รวม</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {order.items.map((it) => (
                      <tr key={it.sku} className="hover:bg-slate-50/60">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={it.image}
                              alt=""
                              className="h-14 w-14 rounded-lg object-cover ring-1 ring-slate-200"
                            />
                            <div>
                              <div className="font-medium text-slate-900">
                                {it.title}
                              </div>
                              <div className="text-xs text-slate-500">
                                SKU: {it.sku}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-700">
                          {it.options?.color ?? "-"}
                        </td>
                        <td className="px-5 py-4 text-right text-slate-700">
                          {formatTHB(it.price)}
                        </td>
                        <td className="px-5 py-4 text-right text-slate-700">
                          {it.qty}
                        </td>
                        <td className="px-5 py-4 text-right font-medium text-slate-900">
                          {formatTHB(it.qty * it.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-700">
                    <BadgePercent className="h-4 w-4" />
                    <span className="text-sm">คูปองส่วนลด</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    โค้ด:{" "}
                    <span className="font-medium text-slate-800">
                      {order.discount?.code ?? "—"}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    สถานะ: ใช้งานแล้ว
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-700">
                    <Truck className="h-4 w-4" />
                    <span className="text-sm">ขนส่ง</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    วิธี:{" "}
                    <span className="font-medium text-slate-800">
                      {order.fulfillment.carrier}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    ระยะเวลาโดยประมาณ: {order.fulfillment.etaDays}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-between py-2 text-sm text-slate-700">
                    <span>รวมค่าสินค้า</span>
                    <span>{formatTHB(totals.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm text-slate-700">
                    <span>ค่าจัดส่ง</span>
                    <span>{formatTHB(totals.shipping)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm text-slate-700">
                    <span>ส่วนลด</span>
                    <span>-{formatTHB(totals.discount)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2 text-sm text-slate-700">
                    <span>VAT 7%</span>
                    <span>{formatTHB(totals.vat)}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 text-base font-semibold text-slate-900">
                    <span>ยอดชำระทั้งหมด</span>
                    <span>{formatTHB(totals.grand)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-slate-600">หมายเหตุ: {order.notes}</p>
            </CardFooter>
          </Card>

          {/* RIGHT: ข้อมูลคำสั่งซื้อ */}
          <div className="lg:col-span-4 space-y-6">
            {/* Payment & Status */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-slate-500" />
                  <h3 className="text-base font-medium">การชำระเงิน</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">วิธีชำระ</span>
                    <span className="font-medium text-slate-900">
                      {order.payment.method}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">สถานะ</span>
                    <Badge variant="success">ชำระเงินแล้ว</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">รหัสธุรกรรม</span>
                    <span className="font-mono text-slate-800">
                      {order.payment.transactionId}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping address */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-slate-500" />
                  <h3 className="text-base font-medium">ที่อยู่จัดส่ง</h3>
                </div>
              </CardHeader>
              <CardContent>
                <address className="not-italic text-sm text-slate-700 leading-6">
                  <div className="font-medium text-slate-900">
                    {order.shippingAddress.name}
                  </div>
                  <div>{order.shippingAddress.line1}</div>
                  <div>{order.shippingAddress.line2}</div>
                  <div>
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode}
                  </div>
                </address>
              </CardContent>
            </Card>

            {/* Billing address */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-slate-500" />
                  <h3 className="text-base font-medium">ออกใบกำกับภาษี</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-700 space-y-1 leading-6">
                  <div className="font-medium text-slate-900">
                    {order.billingAddress.name}
                  </div>
                  <div>{order.billingAddress.line1}</div>
                  <div>{order.billingAddress.line2}</div>
                  <div>
                    {order.billingAddress.city}{" "}
                    {order.billingAddress.postalCode}
                  </div>
                  <div className="text-slate-600">
                    เลขผู้เสียภาษี: {order.billingAddress.taxId}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <h3 className="text-base font-medium">ช่องทางติดต่อ</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-slate-600">
                      <Mail className="h-4 w-4" /> อีเมล
                    </span>
                    <span className="font-medium">{order.contact.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-slate-600">
                      <Phone className="h-4 w-4" /> โทร
                    </span>
                    <span className="font-medium">{order.contact.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-slate-500" />
                  <h3 className="text-base font-medium">สถานะการจัดส่ง</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((s, i) => (
                    <div key={s.label} className="relative">
                      <Step
                        icon={s.icon}
                        label={s.label}
                        active={i <= activeIdx}
                      />
                      {i < steps.length - 1 && (
                        <div className="ml-4 h-6 w-px bg-slate-200" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Help */}
        <div className="mt-8 text-center text-sm text-slate-600">
          ต้องการความช่วยเหลือ? ติดต่อฝ่ายบริการลูกค้าที่
          <a
            href="mailto:support@example.com"
            className="mx-1 font-medium text-slate-900 underline underline-offset-2"
          >
            support@example.com
          </a>
          หรือโทร <span className="font-medium">02-000-0000</span>
        </div>
      </div>
    </div>
  );
}
