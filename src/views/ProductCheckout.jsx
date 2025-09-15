import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Truck, CreditCard, Landmark } from "lucide-react";

// 🔗 สมมติว่ามี CartContext อยู่แล้ว
// import { useCart } from "@/contexts/CartContext";

// เครื่องมือแปลงจำนวนเงิน
const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(n);

const formatFromSatang = (satang) => formatTHB(Math.round(satang) / 100);

// ฟังก์ชันคำนวณ subtotal จากรายการในตะกร้า (ใช้ได้เมื่อ context ยังไม่มี selector)
function calculateSubtotalSatang(items) {
  return items.reduce((sum, it) => sum + it.unitPriceSatang * it.quantity, 0);
}

/**
 * ตัวอย่าง shape ของ item ใน cart (อิงจากที่คุยกันก่อนหน้า)
 * {
 *   key: "p101_black",
 *   productId: "p101",
 *   variantId: "black",
 *   variantDbId: "var_7f1a3c9e",
 *   sku: "NT-HE-0101-BL",
 *   name: "NovaTech Headphones X",
 *   image: "https://.../101-black.jpg",
 *   options: { color: "Black" },
 *   unitPriceSatang: 199000,
 *   quantity: 1,
 *   addedAt: new Date().toISOString()
 * }
 */

export default function CheckoutPage() {
  const navigate = useNavigate();

  // ✅ แทนที่ด้วย useCart ของโปรเจกต์คุณ
  // const { items, currency } = useCart();
  // 🔧 เดโม: mock จาก localStorage หรือให้เป็น [] หากยังไม่มี
  const stored = JSON.parse(localStorage.getItem("cartData") || "{}");
  const items = stored?.items ?? [];
  const currency = stored?.currency ?? "THB";

  // ----- สถานะฟอร์มฝั่งซ้าย -----
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  // วิธีขนส่ง/ชำระเงิน/คูปอง
  const [shippingMethod, setShippingMethod] = useState("standard"); // standard | express
  const [paymentMethod, setPaymentMethod] = useState("promptpay"); // promptpay | cod | credit
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(null); // { code, discountSatang }

  // ค่าจัดส่ง (สตางค์)
  const shippingFeeSatang = useMemo(() => {
    if (shippingMethod === "express") return 5900; // 59 บาท
    return 0; // ส่งฟรีมาตรฐาน
  }, [shippingMethod]);

  // ส่วนลดจากคูปอง (สตางค์)
  const discountSatang = useMemo(() => {
    return couponApplied?.discountSatang ?? 0;
  }, [couponApplied]);

  // ยอดรวมสินค้า (สตางค์)
  const subtotalSatang = useMemo(() => calculateSubtotalSatang(items), [items]);

  // ยอดสุทธิที่ต้องชำระ (สตางค์)
  const totalSatang = useMemo(() => {
    const base = Math.max(0, subtotalSatang - discountSatang);
    return base + shippingFeeSatang;
  }, [subtotalSatang, discountSatang, shippingFeeSatang]);

  // ตรวจฟอร์มง่ายๆ
  const isFormValid = () =>
    fullName.trim() &&
    phone.trim() &&
    email.trim() &&
    province.trim() &&
    district.trim() &&
    address.trim() &&
    postcode.trim() &&
    items.length > 0;

  // กดใช้คูปองแบบง่าย (ตัวอย่างตรรกะ)
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    // ตัวอย่าง: SAVE100 ลด 100 บาท / FREESHIP ตัดค่าส่ง
    if (code === "SAVE100") {
      setCouponApplied({ code, discountSatang: 10000 });
    } else if (code === "FREESHIP") {
      // แปลงเป็นส่วนลดเท่าค่าจัดส่งปัจจุบัน (dynamic)
      setCouponApplied({ code, discountSatang: shippingFeeSatang });
    } else {
      setCouponApplied(null);
      alert("คูปองไม่ถูกต้อง หรือหมดอายุ");
    }
  };

  // ส่งคำสั่งซื้อ (เดโม)
  const placeOrder = async () => {
    if (!isFormValid()) {
      alert("กรุณากรอกข้อมูลผู้รับและที่อยู่ให้ครบถ้วน");
      return;
    }

    // สร้าง payload สำหรับ backend
    const payload = {
      orderId: "ord_" + Math.random().toString(36).slice(2, 8),
      currency,
      items, // snapshot จากตะกร้า
      shipping: {
        method: shippingMethod,
        feeSatang: shippingFeeSatang,
        address: {
          fullName,
          phone,
          email,
          province,
          district,
          address,
          postcode,
        },
      },
      payment: {
        method: paymentMethod,
        status: "pending", // ให้ backend ไปอัปเดตต่อเมื่อชำระเสร็จ
      },
      discounts: {
        coupon: couponApplied,
        discountSatang,
      },
      amounts: {
        subtotalSatang,
        totalSatang,
      },
      createdAt: new Date().toISOString(),
    };

    try {
      // 🔗 เรียก API จริงที่นี่ เช่น:
      // const res = await fetch("/api/orders", { method: "POST", body: JSON.stringify(payload) });
      // const data = await res.json();

      console.log("ORDER_PAYLOAD", payload);
      // เคลียร์ตะกร้าใน localStorage (แล้วแต่ระบบของคุณ)
      // localStorage.removeItem("cartData");

      // ไปหน้า Thank You + ใส่ orderId
      navigate(`/thank-you?orderId=${payload.orderId}`, { replace: true });
    } catch (e) {
      console.error(e);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* หัวข้อ */}
      <div className="mb-6 flex items-center gap-3">
        <ShoppingBag className="h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          สั่งซื้อสินค้า (Checkout)
        </h1>
        <Badge variant="secondary" className="ml-1">
          {items.length} รายการ
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT: ฟอร์มข้อมูลผู้รับ + การจัดส่ง + การชำระเงิน */}
        <Card className="lg:col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">ข้อมูลจัดส่ง</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-6 pt-6">
            {/* ข้อมูลผู้รับ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">ชื่อ-นามสกุลผู้รับ</Label>
                <Input
                  id="fullName"
                  placeholder="สมชาย ใจดี"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
              <div className="md:col-span-2">
                <Label htmlFor="email">อีเมล (สำหรับใบเสร็จ/ติดตามพัสดุ)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* ที่อยู่ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>จังหวัด</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกจังหวัด" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="กรุงเทพมหานคร">กรุงเทพมหานคร</SelectItem>
                    <SelectItem value="ชลบุรี">ชลบุรี</SelectItem>
                    <SelectItem value="เชียงใหม่">เชียงใหม่</SelectItem>
                    <SelectItem value="ภูเก็ต">ภูเก็ต</SelectItem>
                    {/* ✅ เพิ่มจังหวัดของคุณเองตามจริง */}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>อำเภอ/เขต</Label>
                <Input
                  placeholder="อำเภอ/เขต"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label>ที่อยู่จัดส่ง</Label>
                <Textarea
                  placeholder="บ้านเลขที่, หมู่บ้าน/อาคาร, ถนน, ซอย"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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

            <Separator />

            {/* วิธีขนส่ง */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <h3 className="font-medium">วิธีการจัดส่ง</h3>
              </div>
              <RadioGroup
                value={shippingMethod}
                onValueChange={setShippingMethod}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <Label className="border rounded-xl p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="standard" id="ship-standard" />
                    <div>
                      <div className="font-medium">มาตรฐาน (2–4 วัน)</div>
                      <div className="text-sm text-muted-foreground">ฟรี</div>
                    </div>
                  </div>
                </Label>
                <Label className="border rounded-xl p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="express" id="ship-express" />
                    <div>
                      <div className="font-medium">ด่วน (ภายใน 1–2 วัน)</div>
                      <div className="text-sm text-muted-foreground">
                        {formatFromSatang(5900)}
                      </div>
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            <Separator />

            {/* วิธีชำระเงิน */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <h3 className="font-medium">วิธีชำระเงิน</h3>
              </div>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <Label className="border rounded-xl p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="promptpay" id="pay-promptpay" />
                    <div>
                      <div className="font-medium">PromptPay / QR</div>
                      <div className="text-sm text-muted-foreground">
                        สแกนชำระทันที
                      </div>
                    </div>
                  </div>
                </Label>
                <Label className="border rounded-xl p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cod" id="pay-cod" />
                    <div>
                      <div className="font-medium">เก็บเงินปลายทาง</div>
                      <div className="text-sm text-muted-foreground">
                        มีค่าธรรมเนียมตามผู้ให้บริการ
                      </div>
                    </div>
                  </div>
                </Label>
                <Label className="border rounded-xl p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="credit" id="pay-credit" />
                    <div>
                      <div className="font-medium">บัตรเครดิต/เดบิต</div>
                      <div className="text-sm text-muted-foreground">
                        Visa / MasterCard
                      </div>
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => navigate("/cart")}>
              กลับไปแก้ไขตะกร้า
            </Button>
            <Button
              className="rounded-full h-11"
              onClick={placeOrder}
              disabled={!isFormValid()}
            >
              ดำเนินการชำระเงิน
            </Button>
          </CardFooter>
        </Card>

        {/* RIGHT: สรุปคำสั่งซื้อ */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">สรุปคำสั่งซื้อ</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {items.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">
                ตะกร้าว่าง
              </div>
            ) : (
              <>
                <ScrollArea className="max-h-[40vh]">
                  <ul className="divide-y">
                    {items.map((it) => (
                      <li key={it.key} className="p-4 flex gap-3">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="h-16 w-16 rounded-md object-cover border"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="font-medium leading-tight">
                              {it.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatFromSatang(it.unitPriceSatang)}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {it.options?.color && (
                              <>สี: {it.options.color} • </>
                            )}
                            จำนวน: {it.quantity}
                          </div>
                          <div className="text-sm mt-1">
                            รวม:{" "}
                            {formatFromSatang(it.unitPriceSatang * it.quantity)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>

                <div className="p-4 space-y-3">
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

                  {/* แสดงสรุปตัวเลข */}
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
                    <div className="flex justify-between font-semibold text-base">
                      <span>ยอดที่ต้องชำระ</span>
                      <span>{formatFromSatang(totalSatang)}</span>
                    </div>
                  </div>

                  {/* หมายเหตุ/กำกับใบกำกับภาษี */}
                  <div className="pt-2">
                    <Label htmlFor="notes">หมายเหตุเพิ่มเติม (ถ้ามี)</Label>
                    <Textarea
                      id="notes"
                      placeholder="เช่น ต้องการใบกำกับภาษี/ ออกใบเสร็จชื่อบริษัท ฯลฯ"
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-2">
            <Button
              className="rounded-full h-11"
              onClick={placeOrder}
              disabled={!isFormValid()}
            >
              ยืนยันและชำระเงิน
            </Button>
            <div className="text-xs text-muted-foreground text-center">
              <Landmark className="inline h-3.5 w-3.5 mr-1" />
              ราคาสกุลเงิน: {currency} •
              ระบบจะบันทึกที่อยู่เพื่อการจัดส่งเท่านั้น
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
