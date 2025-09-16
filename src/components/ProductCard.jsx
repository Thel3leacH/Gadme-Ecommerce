import { Card, CardContent, CardFooter } from "@/components/ui/card"; // ถ้าไม่มี alias @/ ให้เปลี่ยนเป็นทางRelative
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  ReceiptText,
  Tag as TagIcon,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const MAX_TAGS = 3;
// ✅ ชื่อคอมโพเนนต์ต้อง PascalCase และตรงกับที่ถูกเรียกใช้
export default function ProductCard({ product }) {
  const tags = Array.isArray(product?.product_tag)
    ? product.product_tag.filter(Boolean)
    : [];
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
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-gray-900 pt-5">
            {product?._id || "Product name"}
          </h3>

          <div className="flex items-center justify-between">
            {product?.product_brand ? (
              <Badge
                variant="outline"
                className="
          rounded-full px-2.5 py-1 text-[11px] md:text-[12px]
          bg-white/70 dark:bg-neutral-900/60 backdrop-blur
          border-violet-200/70 dark:border-violet-800/60
          hover:bg-violet-50/70 dark:hover:bg-violet-900/40
          transition-colors
        "
              >
                <BadgeCheck className="mr-1.5 h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                <span className="opacity-70 mr-1">Brand</span>
                <span className="mx-1 h-3 w-px bg-current/20 inline-block align-middle" />
                <span className="font-medium">{product.product_brand}</span>
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

          {tags.length > 0 && (
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <TagIcon className="h-3.5 w-3.5 opacity-70" aria-hidden />
              {tags.slice(0, MAX_TAGS).map((t, i) => (
                <Badge
                  key={`${t}-${i}`}
                  variant="outline"
                  className="rounded-full px-2 py-0.5 text-[11px]"
                  title={t}
                >
                  {t}
                </Badge>
              ))}
              {tags.length > MAX_TAGS && (
                <Badge
                  variant="secondary"
                  className="rounded-full px-2 py-0.5 text-[11px]"
                  title={tags.slice(MAX_TAGS).join(", ")}
                >
                  +{tags.length - MAX_TAGS}
                </Badge>
              )}
            </div>
          )}

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

        <CardFooter className="p-4 pt-5 pb-2">
          <Button
            variant="destructive"
            className="h-11 w-full rounded-full bg-teal-500 !text-white hover:bg-teal-300 focus-visible:!ring-2 focus-visible:ring-red-500"
          >
            <ReceiptText className="mr-2 h-5 w-5" /> View Details
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
