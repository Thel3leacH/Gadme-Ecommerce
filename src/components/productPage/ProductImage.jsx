// ProductImage.jsx
import { useEffect, useRef } from "react";

// jQuery + slick
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

export function ProductImage({
  products = [],
  product = null,
  className = "",
}) {
  // รองรับทั้ง products (array) และ product (เดี่ยว)
  const list =
    Array.isArray(products) && products.length
      ? products
      : product
      ? [product]
      : [];

  // รวม URL รูปจากทุก product (รองรับทั้ง images[] และ productImage / product_image / image*)
  const gatherImagesFromProduct = (p) => {
    if (!p) return [];
    if (Array.isArray(p.images) && p.images.length)
      return p.images.filter(Boolean);

    // scan key ที่น่าจะเป็นรูป
    const keys = Object.keys(p).filter((k) => {
      const low = k.toLowerCase();
      return (
        low.startsWith("productimage") ||
        low.startsWith("product_image") ||
        low === "image" ||
        low.startsWith("image")
      );
    });

    // เรียงตามเลขท้ายคีย์ (ไม่มีเลข=0) เพื่อได้ลำดับถูก
    keys.sort((a, b) => {
      const ai = parseInt(a.match(/\d+/)?.[0] ?? "0", 10);
      const bi = parseInt(b.match(/\d+/)?.[0] ?? "0", 10);
      return ai - bi;
    });

    return keys.map((k) => p[k]).filter(Boolean);
  };

  // รวมรูปจากทุกสินค้า + ตัดซ้ำ
  const allImages = list.flatMap((p, idx) => {
    const imgs = gatherImagesFromProduct(p);
    const name = p?.productName ?? p?.product_name ?? `product-${idx + 1}`;
    return imgs.map((src, i) => ({ src, alt: `${name} - ${i + 1}` }));
  });
  const seen = new Set();
  const images = allImages.filter(({ src }) =>
    seen.has(src) ? false : (seen.add(src), true)
  );

  // สร้าง id เฉพาะ instance เพื่อใช้ asNavFor แบบไม่ชนกัน
  const uidRef = useRef(`slick-${Math.random().toString(36).slice(2, 9)}`);
  const uid = uidRef.current;

  // init / re-init slick เมื่อรายการรูปเปลี่ยน
  useEffect(() => {
    const $for = $(`#for-${uid}`);
    const $nav = $(`#nav-${uid}`);

    if ($for.hasClass("slick-initialized")) $for.slick("unslick");
    if ($nav.hasClass("slick-initialized")) $nav.slick("unslick");

    if (images.length > 0) {
      $for.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: `#nav-${uid}`,
      });
      $nav.slick({
        slidesToShow: Math.min(5, images.length),
        slidesToScroll: 1,
        asNavFor: `#for-${uid}`,
        dots: true,
        centerMode: images.length >= 3,
        focusOnSelect: true,
      });
    }

    return () => {
      if ($for.hasClass("slick-initialized")) $for.slick("unslick");
      if ($nav.hasClass("slick-initialized")) $nav.slick("unslick");
    };
    // ใช้ join เพื่อให้ effect run เมื่อรายการรูปเปลี่ยนจริง ๆ
  }, [uid, images.map((i) => i.src).join("|")]);

  if (!images.length) return <div>ไม่มีรูปภาพ</div>;

  return (
    <div
      className={`w-[30rem] flex flex-col justify-center items-center gap-2 ${className}`}
    >
      {/* slider-for (ภาพใหญ่) */}
      <div id={`for-${uid}`} className="slider-for w-[25rem]">
        {images.map((img, i) => (
          <div key={`for-${i}-${img.src}`}>
            <img
              src={img.src}
              alt={img.alt}
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* slider-nav (ภาพย่อทั้งหมด) */}
      <div id={`nav-${uid}`} className="slider-nav w-full cursor-pointer">
        {images.map((img, i) => (
          <div key={`nav-${i}-${img.src}`} className="w-full">
            <img
              src={img.src}
              alt={`${img.alt} thumb`}
              className="block mx-auto w-[5.5rem] rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
