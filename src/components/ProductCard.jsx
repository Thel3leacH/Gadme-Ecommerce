import { Card, CardContent, CardFooter } from "@/components/ui/card"; // ถ้าไม่มี alias @/ ให้เปลี่ยนเป็นทางRelative
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";

// ✅ ชื่อคอมโพเนนต์ต้อง PascalCase และตรงกับที่ถูกเรียกใช้
export default function ProductCard({ product }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden py-6 rounded-2xl border border-gray-200/70 bg-white shadow-sm transition-all hover:shadow-lg">
      <Link
        to={`/products/${encodeURIComponent(product._id)}`}
        className="block"
      >
        {/* รูป */}
        <div className="relative">
          <img
            src={
              product?.product_image || "https://picsum.photos/800?grayscale"
            }
            alt={product?._id || "product"}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* overlay นุ่ม ๆ */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/0" />
        </div>

        {/* เนื้อหา */}
        <CardContent className="flex flex-1 flex-col gap-3 px-4 py-0">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-gray-900 py-5">
            {product?._id || "ชื่อสินค้า"}
          </h3>

          <div className="flex items-center justify-between">
            {product?.product_brand ? (
              <Badge
                variant="destructive"
                className="text-white px-2.5 py-1 text-[12px]"
              >
                {product.product_brand}
              </Badge>
            ) : (
              <span />
            )}

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              aria-label="เพิ่มรายการโปรด"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* ดันราคาลงด้านล่างของ content */}
          <div className="mt-auto">
            <div className="flex justify-center gap-2">
              <div className="text-xl font-bold tracking-tight text-gray-900">
                {" "}
                ฿&nbsp;
                {product?.minPrice || "888888888"}
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="destructive"
          className="h-11 w-full rounded-full bg-teal-500 !text-white hover:bg-teal-300 focus-visible:!ring-2 focus-visible:ring-red-500"
        >
          <ReceiptText className="mr-2 h-5 w-5" /> Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
