import React from "react";

// 🔎 Mini self-tests สำหรับเดโมเท่านั้น
export default function SelfTests({
  items,
  subtotalSatang,
  totalSatang,
  shippingFeeSatang,
  discountSatang,
}) {
  const expectedSubtotal = 199000 + 129000 * 2; // 1,990 + (1,290*2) = 4,570 บาท => 457000 สตางค์
  const tests = [
    {
      name: "Subtotal is sum(items) in satang",
      pass: subtotalSatang === expectedSubtotal,
      expected: expectedSubtotal,
      got: subtotalSatang,
    },
    {
      name: "Total = subtotal - discount + shipping",
      pass:
        totalSatang ===
        Math.max(0, subtotalSatang - discountSatang) + shippingFeeSatang,
      expected:
        Math.max(0, subtotalSatang - discountSatang) + shippingFeeSatang,
      got: totalSatang,
    },
    {
      name: "Items length > 0",
      pass: items.length > 0,
      expected: "> 0",
      got: items.length,
    },
  ];

  return (
    <details className="mt-4 text-xs text-gray-600">
      <summary className="cursor-pointer select-none">
        Self-tests (click to toggle)
      </summary>
      <ul className="mt-2 space-y-1">
        {tests.map((t) => (
          <li key={t.name}>
            <span
              className={`font-medium ${
                t.pass ? "text-green-600" : "text-red-600"
              }`}
            >
              {t.pass ? "PASS" : "FAIL"}
            </span>{" "}
            – {t.name}
            {!t.pass && (
              <span className="ml-1">
                (expected: {t.expected}, got: {t.got})
              </span>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
