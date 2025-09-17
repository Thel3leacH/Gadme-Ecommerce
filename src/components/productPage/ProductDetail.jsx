export function ProductDetail({
  products = [],
  product: productProp,
  loading = false,
  error = null,
}) {
  // รับมาได้ทั้งก้อนเดียวหรือ array → เลือกตัวแรกเป็นดีฟอลต์
  const product = productProp ?? (Array.isArray(products) ? products[0] : null);

  const description =
    product?.product_description ?? // ✅ จากฐานข้อมูล (snake_case)
    product?.productDescription ?? // fallback ถ้าเป็น camelCase เดิม
    product?.description ?? // fallback อื่น ๆ
    "";

  const specs = product?.product_spec ?? product?.productSpec ?? {};

  return (
    <div>
      {loading && <div className="text-center">Loading⌛...</div>}
      {error && <div className="text-red-600">โหลดข้อมูลไม่สำเร็จ</div>}
      {!loading && !error && !product && (
        <div className="text-gray-500">ไม่พบสินค้า</div>
      )}

      <div className="flex flex-col gap-5">
        {/* productSpec */}
        <table className="border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className=" pb-5 w-[18rem] border-b border-gray-200 text-[1.25rem] text-left">
                Product Spec :{" "}
                {product?.product_name ?? product?.productName ?? "-"}
              </th>
            </tr>
          </thead>
          <p>
            {Object.entries(specs).map(([spec, detail]) => (
              <tr key={spec}>
                <td className="p-1 border-b border-gray-100">{spec}</td>
                <td className="p-1 border-b border-gray-100">
                  {Array.isArray(detail) ? detail.join(", ") : String(detail)}
                </td>
              </tr>
            ))}
          </p>
        </table>

        {/* ✅ product_description */}
        <div className="lg:w-[45rem] whitespace-pre-line">
          {description || "—"}
        </div>
      </div>
    </div>
  );
}
