import { useState, useMemo, useCallback } from "react";

export const useCoupon = (shippingFeeSatang) => {
  // ----- คูปอง / ตัวเลขรวม ----- (จากโค้ดเดิม)
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(null); // { code, discountSatang }

  const discountSatang = useMemo(
    () => couponApplied?.discountSatang ?? 0,
    [couponApplied]
  );

  const applyCoupon = useCallback(() => {
    const code = couponCode.trim().toUpperCase();
    if (code === "SAVE100") {
      setCouponApplied({ code, discountSatang: 10000 }); // ลด 100 บาท
    } else if (code === "FREESHIP") {
      setCouponApplied({ code, discountSatang: shippingFeeSatang }); // ลดเท่าค่าจัดส่ง (เดโม = 0)
    } else {
      setCouponApplied(null);
      alert("Coupon is invalid or expired.");
    }
  }, [couponCode, shippingFeeSatang]);

  return {
    couponCode,
    setCouponCode,
    couponApplied,
    discountSatang,
    applyCoupon,
  };
};
