import { Separator } from "@/components/ui/separator";
import { formatFromSatang } from "../../utils/currency";

export default function PricingSummary({
  subtotalSatang,
  shippingFeeSatang,
  discountSatang,
  totalSatang,
  couponApplied,
}) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatFromSatang(subtotalSatang)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping Fee</span>
        <span>
          {shippingFeeSatang === 0
            ? "Free"
            : formatFromSatang(shippingFeeSatang)}
        </span>
      </div>
      {discountSatang > 0 && (
        <div className="flex justify-between text-green-600">
          <span>
            Discount
            {couponApplied?.code ? ` (${couponApplied.code})` : ""}
          </span>
          <span>-{formatFromSatang(discountSatang)}</span>
        </div>
      )}
      <Separator />
      <div className="flex justify-between text-base font-semibold">
        <span>Total Amount</span>
        <span>{formatFromSatang(totalSatang)}</span>
      </div>
    </div>
  );
}
