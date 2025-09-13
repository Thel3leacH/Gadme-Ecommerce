import React, { useMemo, useState } from "react";

// ✅ Checkout Demo (shadcn-style) – cleaned & fixed
// - แก้โครงสร้าง JSX ให้ปิดแท็กถูกต้อง (CardContent / div)
// - นำส่วน "วิธีการจัดส่ง", "วิธีการชำระเงิน", และ "หมายเหตุเพิ่มเติม" ออกแล้วตามที่ขอ
// - เพิ่มฟิลด์: ชื่อ, นามสกุล, ที่อยู่ (textarea), แขวง/ตำบล, อำเภอ/เขต, จังหวัด, รหัสไปรษณีย์
// - คงสรุปราคา + คูปองฝั่งขวาไว้
// - เพิ่ม Self-tests (mini tests) เพื่อเช็ค subtotal/total แบบง่าย ๆ ในโหมดเดโม

// เครื่องมือ format เงิน
const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(n);
const formatFromSatang = (satang) => formatTHB(Math.round(satang) / 100);

// 👇 ตัวอย่าง mock ตะกร้า (เดโม)
const mockCart = {
  currency: "THB",
  items: [
    {
      key: "p101_black",
      productId: "p101",
      variantId: "black",
      variantDbId: "var_7f1a3c9e",
      sku: "NT-HE-0101-BL",
      name: "NovaTech Headphones X",
      image: "https://picsum.photos/seed/gadget-101-black/128/128",
      options: { color: "Black" },
      unitPriceSatang: 199000, // 1,990 บาท
      quantity: 1,
      addedAt: new Date().toISOString(),
    },
    {
      key: "p202_blue",
      productId: "p202",
      variantId: "blue",
      variantDbId: "var_8g2b5p1",
      sku: "SP-PW-0202-BLU",
      name: "Spark Power Bank 20,000mAh",
      image: "https://picsum.photos/seed/gadget-202-blue/128/128",
      options: { color: "Blue" },
      unitPriceSatang: 129000, // 1,290 บาท
      quantity: 2,
      addedAt: new Date().toISOString(),
    },
  ],
};

function calculateSubtotalSatang(items) {
  return items.reduce((sum, it) => sum + it.unitPriceSatang * it.quantity, 0);
}

// องค์ประกอบ UI เล็ก ๆ เลียนแบบ shadcn (Tailwind เท่านั้น)
const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ className = "", children }) => (
  <div className={`p-4 md:p-5 ${className}`}>{children}</div>
);
const CardTitle = ({ className = "", children }) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);
const CardContent = ({ className = "", children }) => (
  <div className={`p-4 md:p-5 ${className}`}>{children}</div>
);
const CardFooter = ({ className = "", children }) => (
  <div className={`p-4 md:p-5 ${className}`}>{children}</div>
);
const Separator = () => <div className="border-t" />;
const Label = (props) => (
  <label className="mb-1 block text-sm font-medium text-gray-700" {...props} />
);
const Input = ({ className = "", ...rest }) => (
  <input
    className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 ${className}`}
    {...rest}
  />
);
const Textarea = ({ className = "", ...rest }) => (
  <textarea
    className={`w-full min-h-[88px] rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 ${className}`}
    {...rest}
  />
);
const Button = ({ variant = "default", className = "", ...rest }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition";
  const styles = {
    default: "bg-gray-900 text-white hover:bg-black",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest} />
  );
};

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 ${className}`}
  >
    {children}
  </span>
);

const Select = ({ value, onChange, placeholder, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options?.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const ScrollArea = ({ className = "", children }) => (
  <div className={`overflow-y-auto ${className}`}>{children}</div>
);

// 🔎 Mini self-tests สำหรับเดโมเท่านั้น
function SelfTests({
  items,
  subtotalSatang,
  totalSatang,
  shippingFeeSatang,
  discountSatang,
}) {
  const expectedSubtotal = 199000 + 129000 * 2; // 1,990 + (1,290*2) = 4,570 บาท => 457000 สตางค์
  const tests = [
    {
      name: "Subtotal is sum(items) in satang",
      pass: subtotalSatang === expectedSubtotal,
      expected: expectedSubtotal,
      got: subtotalSatang,
    },
    {
      name: "Total = subtotal - discount + shipping",
      pass:
        totalSatang ===
        Math.max(0, subtotalSatang - discountSatang) + shippingFeeSatang,
      expected:
        Math.max(0, subtotalSatang - discountSatang) + shippingFeeSatang,
      got: totalSatang,
    },
    {
      name: "Items length > 0",
      pass: items.length > 0,
      expected: "> 0",
      got: items.length,
    },
  ];

  return (
    <details className="mt-4 text-xs text-gray-600">
      <summary className="cursor-pointer select-none">
        Self-tests (click to toggle)
      </summary>
      <ul className="mt-2 space-y-1">
        {tests.map((t) => (
          <li key={t.name}>
            <span
              className={`font-medium ${
                t.pass ? "text-green-600" : "text-red-600"
              }`}
            >
              {t.pass ? "PASS" : "FAIL"}
            </span>{" "}
            – {t.name}
            {!t.pass && (
              <span className="ml-1">
                (expected: {t.expected}, got: {t.got})
              </span>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function Checkout() {
  // 👉 ในโปรเจกต์จริง ให้ดึงจาก useCart() แทน mockCart
  const { items, currency } = mockCart;

  // ----- ฟอร์มผู้รับ/ที่อยู่ -----
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  // ----- คูปอง / ตัวเลขรวม -----
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(null); // { code, discountSatang }

  const shippingFeeSatang = 0; // ตัดส่วนวิธีขนส่งออก => ส่งฟรีในเดโม
  const discountSatang = useMemo(
    () => couponApplied?.discountSatang ?? 0,
    [couponApplied]
  );
  const subtotalSatang = useMemo(() => calculateSubtotalSatang(items), [items]);
  const totalSatang = useMemo(() => {
    const base = Math.max(0, subtotalSatang - discountSatang);
    return base + shippingFeeSatang;
  }, [subtotalSatang, discountSatang, shippingFeeSatang]);

  const isFormValid = () =>
    firstName.trim() &&
    lastName.trim() &&
    phone.trim() &&
    // email.trim() &&
    address.trim() &&
    subdistrict.trim() &&
    district.trim() &&
    province.trim() &&
    postcode.trim() &&
    items.length > 0;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "SAVE100") {
      setCouponApplied({ code, discountSatang: 10000 }); // ลด 100 บาท
    } else if (code === "FREESHIP") {
      setCouponApplied({ code, discountSatang: shippingFeeSatang }); // ลดเท่าค่าจัดส่ง (เดโม = 0)
    } else {
      setCouponApplied(null);
      alert("คูปองไม่ถูกต้อง หรือหมดอายุ");
    }
  };

  const placeOrder = () => {
    if (!isFormValid()) {
      alert("กรุณากรอกข้อมูลผู้รับและที่อยู่ให้ครบถ้วน");
      return;
    }
    const payload = {
      orderId: "ord_" + Math.random().toString(36).slice(2, 8),
      currency,
      items,
      shipping: {
        method: null, // ไม่มีตัวเลือกวิธีส่งในเดโมนี้
        feeSatang: shippingFeeSatang,
        address: {
          firstName,
          lastName,
          phone,
          // email,
          address,
          subdistrict,
          district,
          province,
          postcode,
        },
      },
      payment: { status: "pending" }, // ไม่มีตัวเลือกวิธีชำระในเดโมนี้
      discounts: { coupon: couponApplied, discountSatang },
      amounts: { subtotalSatang, totalSatang },
      createdAt: new Date().toISOString(),
    };
    alert(
      `สั่งซื้อสำเร็จ!\nรหัสคำสั่งซื้อ: ${
        payload.orderId
      }\nยอดชำระ: ${formatFromSatang(totalSatang)}`
    );
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* พื้นหลังไล่สีแบบนุ่ม ๆ */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #14b8a6 100%)`,
          backgroundSize: "100% 100%",
        }}
      />

      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* หัวเรื่อง */}
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-6 w-6 place-items-center rounded-full bg-gray-900 text-[11px] text-white">
            🛒
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            สั่งซื้อสินค้า (Checkout)
          </h1>
          <Badge className="ml-1">{items.length} รายการ</Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT */}
          <Card className="lg:col-span-8">
            <CardHeader className="pb-3">
              <CardTitle>ข้อมูลจัดส่ง</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-6 pt-6">
              {/* ผู้รับ */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">ชื่อ</Label>
                  <Input
                    id="firstName"
                    placeholder="สมชาย"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">นามสกุล</Label>
                  <Input
                    id="lastName"
                    placeholder="ใจดี"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">เบอร์โทร</Label>
                  <Input
                    id="phone"
                    placeholder="08x-xxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {/* <div>
                  <Label htmlFor="email">
                    อีเมล (สำหรับใบเสร็จ/ติดตามพัสดุ)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}
              </div>

              {/* ที่อยู่ */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>ที่อยู่</Label>
                  <Textarea
                    placeholder="บ้านเลขที่, หมู่บ้าน/อาคาร, ถนน, ซอย"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label>แขวง/ตำบล</Label>
                    <Input
                      placeholder="แขวง/ตำบล"
                      value={subdistrict}
                      onChange={(e) => setSubdistrict(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>อำเภอ/เขต</Label>
                    <Input
                      placeholder="อำเภอ/เขต"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label>จังหวัด</Label>
                    <Input
                      placeholder="จังหวัด"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>รหัสไปรษณีย์</Label>
                    <Input
                      placeholder="xxxxx"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT */}
          <Card className="lg:col-span-4">
            <CardHeader className="pb-3">
              <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              {items.length === 0 ? (
                <div className="p-6 text-sm text-gray-500">ตะกร้าว่าง</div>
              ) : (
                <>
                  <ScrollArea className="max-h-[40vh]">
                    <ul className="divide-y">
                      {items.map((it) => (
                        <li key={it.key} className="flex gap-3 p-4">
                          <img
                            src={it.image}
                            alt={it.name}
                            className="h-16 w-16 rounded-md border object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="font-medium leading-tight">
                                {it.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatFromSatang(it.unitPriceSatang)}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {it.options?.color && (
                                <>สี: {it.options.color} • </>
                              )}
                              จำนวน: {it.quantity}
                            </div>
                            <div className="mt-1 text-sm">
                              รวม:{" "}
                              {formatFromSatang(
                                it.unitPriceSatang * it.quantity
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>

                  <div className="space-y-3 p-4">
                    {/* คูปอง */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="กรอกรหัสคูปอง (เช่น SAVE100 / FREESHIP)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button variant="secondary" onClick={applyCoupon}>
                        ใช้คูปอง
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ยอดรวมสินค้า</span>
                        <span>{formatFromSatang(subtotalSatang)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ค่าจัดส่ง</span>
                        <span>
                          {shippingFeeSatang === 0
                            ? "ฟรี"
                            : formatFromSatang(shippingFeeSatang)}
                        </span>
                      </div>
                      {discountSatang > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>
                            ส่วนลด
                            {couponApplied?.code
                              ? ` (${couponApplied.code})`
                              : ""}
                          </span>
                          <span>-{formatFromSatang(discountSatang)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-base font-semibold">
                        <span>ยอดที่ต้องชำระ</span>
                        <span>{formatFromSatang(totalSatang)}</span>
                      </div>
                    </div>

                    {/* Self-tests panel */}
                    <SelfTests
                      items={items}
                      subtotalSatang={subtotalSatang}
                      totalSatang={totalSatang}
                      shippingFeeSatang={shippingFeeSatang}
                      discountSatang={discountSatang}
                    />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-2">
              <Button
                className="h-11"
                onClick={placeOrder}
                disabled={!isFormValid()}
              >
                ยืนยันและชำระเงิน
              </Button>
              <div className="text-center text-xs text-gray-500">
                💼 ราคาสกุลเงิน: {currency} •
                ระบบจะบันทึกที่อยู่เพื่อการจัดส่งเท่านั้น
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
