import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CouponSection({
  couponCode,
  setCouponCode,
  applyCoupon,
}) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="กรอกรหัสคูปอง (เช่น SAVE100 / FREESHIP)"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <Button variant="secondary" onClick={applyCoupon}>
        Use
      </Button>
    </div>
  );
}
