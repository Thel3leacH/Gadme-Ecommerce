import React, { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { formatFromSatang } from "../../utils/currency";
import { calculateSubtotalSatang } from "../../utils/calculations";
import { mockCart } from "../../constants/mockData";
import { useCheckoutForm } from "../../hooks/useCheckoutForm";
import { useCoupon } from "../../hooks/useCoupon";

import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";

export default function CheckoutPage() {
  // 👉 ในโปรเจกต์จริง ให้ดึงจาก useCart() แทน mockCart
  const { items, currency } = mockCart;

  // Custom hooks
  const { formData, setters, isFormValid } = useCheckoutForm(items);

  const shippingFeeSatang = 0; // ตัดส่วนวิธีขนส่งออก => ส่งฟรีในเดโม
  const {
    couponCode,
    setCouponCode,
    couponApplied,
    discountSatang,
    applyCoupon,
  } = useCoupon(shippingFeeSatang);

  const subtotalSatang = useMemo(() => calculateSubtotalSatang(items), [items]);
  const totalSatang = useMemo(() => {
    const base = Math.max(0, subtotalSatang - discountSatang);
    return base + shippingFeeSatang;
  }, [subtotalSatang, discountSatang, shippingFeeSatang]);

  const placeOrder = () => {
    if (!isFormValid) {
      alert("กรุณากรอกข้อมูลผู้รับและที่อยู่ให้ครบถ้วน");
      return;
    }

    const payload = {
      orderId: "ord_" + Math.random().toString(36).slice(2, 8),
      currency,
      items,
      shipping: {
        method: null,
        feeSatang: shippingFeeSatang,
        address: formData,
      },
      payment: { status: "pending" },
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
            Order Checkout
          </h1>
          <Badge className="ml-1">{items.length} items</Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT */}
          <ShippingForm formData={formData} setters={setters} />

          {/* RIGHT */}
          <OrderSummary
            items={items}
            currency={currency}
            subtotalSatang={subtotalSatang}
            shippingFeeSatang={shippingFeeSatang}
            totalSatang={totalSatang}
            discountSatang={discountSatang}
            couponApplied={couponApplied}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            applyCoupon={applyCoupon}
            isFormValid={isFormValid}
            placeOrder={placeOrder}
          />
        </div>
      </div>
    </div>
  );
}
