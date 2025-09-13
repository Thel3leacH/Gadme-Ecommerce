import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartItems from "./CartItems";
import CouponSection from "./CouponSection";
import PricingSummary from "./PricingSummary";
import SelfTests from "./SelfTests";

export default function OrderSummary({
  items,
  currency,
  subtotalSatang,
  shippingFeeSatang,
  totalSatang,
  discountSatang,
  couponApplied,
  couponCode,
  setCouponCode,
  applyCoupon,
  isFormValid,
  placeOrder,
}) {
  return (
    <Card className="lg:col-span-4">
      <CardHeader className="pb-3">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">Empty Cart</div>
        ) : (
          <>
            <CartItems items={items} />

            <div className="space-y-3 p-4">
              <CouponSection
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                applyCoupon={applyCoupon}
              />

              <Separator />

              <PricingSummary
                subtotalSatang={subtotalSatang}
                shippingFeeSatang={shippingFeeSatang}
                discountSatang={discountSatang}
                totalSatang={totalSatang}
                couponApplied={couponApplied}
              />

              {/* <SelfTests
                items={items}
                subtotalSatang={subtotalSatang}
                totalSatang={totalSatang}
                shippingFeeSatang={shippingFeeSatang}
                discountSatang={discountSatang}
              /> */}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <Button className="h-11" onClick={placeOrder} disabled={!isFormValid}>
          Confirm Order
        </Button>
        <div className="text-center text-xs text-gray-500">
          💼 Price currency: {currency} • The system will save the address for
          delivery only.
        </div>
      </CardFooter>
    </Card>
  );
}
