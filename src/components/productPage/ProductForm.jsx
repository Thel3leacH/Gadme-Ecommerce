import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const API_URL = "http://localhost:3000";

export function ProductForm() {
  const { name } = useParams(); // = :product_name
  const [products, setProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // โหลดสินค้าชื่อเดียวกันทั้งหมด (เรียงราคาต่ำ->สูงตาม API)
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/productdetail/${encodeURIComponent(name)}`
        );
        if (cancel) return;
        const rows = Array.isArray(res.data?.products) ? res.data.products : [];
        setProducts(rows);
        setSelectedColor(rows[0]?.product_color || ""); // ตั้งค่าตัวเลือกแรก
      } catch (e) {
        if (!cancel) setError(e);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [name]);

  // ทำรายการตัวเลือกสีจากเอกสารที่ได้
  const colorOptions = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p?.product_color).filter(Boolean))
    );
  }, [products]);

  // variant ที่ใช้งานตามสีที่เลือก
  const active = useMemo(() => {
    if (!products.length) return null;
    if (!selectedColor) return products[0];
    return (
      products.find((p) => p.product_color === selectedColor) || products[0]
    );
  }, [products, selectedColor]);

  const handleQuantity = (op) => {
    setQuantity((q) => (op === "+" ? q + 1 : Math.max(1, q - 1)));
  };

  const { add } = useCart();

  const handleAddToCart = () => {
    console.log("handleAddToCart");
    if (!active) return;
    const payload = {
      product_id: active._id,
      product_name: active.product_name,
      product_color: active.product_color,
      product_price: active.product_price,
      product_image: active.product_image,
      product_qty: quantity,
    };
    add(payload, quantity);
  };

  if (loading) return <div className="p-6 text-center">Loading⌛...</div>;
  if (error) return <div className="p-6 text-red-600">โหลดข้อมูลไม่สำเร็จ</div>;
  if (!active) return <div className="p-6">ไม่พบสินค้า</div>;
  return (
    <div className="mx-auto w-[15rem] lg:w-[30rem]">
      <div className="flex flex-col gap-5">
        <a href="#" className="underline">
          {active.product_category}
        </a>
        <h1 className="text-[2.5rem] font-bold">{active.product_name}</h1>

        {/* color */}
        <p>Color</p>
        <select
          name="color"
          className="py-1.5 w-[12rem] border rounded-md"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {colorOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <p>Quantity</p>
        <div className="flex gap-5">
          <button
            onClick={() => handleQuantity("-")}
            className="cursor-pointer"
          >
            -
          </button>
          <span className="py-1.5 w-10 border rounded-md text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantity("+")}
            className="cursor-pointer"
          >
            +
          </button>
        </div>

        {/* ราคา (เติมได้ถ้าต้องการแสดง) */}
        <div className="text-lg font-semibold">
          ฿{Number(active.product_price || 0).toLocaleString()}
        </div>

        <div className="my-[1rem] flex flex-col justify-center items-center gap-5">
          <img
            src="/guarantee.png"
            alt="guarantee"
            className="w-[25rem] lg:w-[30rem]"
          />
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
            <button
              className="py-1.5 w-[15rem] rounded-[2rem] bg-[#FAAE2B] text-[#006A71] cursor-pointer lg:w-[12rem]"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="py-1.5 w-[15rem] rounded-[2rem] bg-[#006A71] text-white cursor-pointer lg:w-[12rem]">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
