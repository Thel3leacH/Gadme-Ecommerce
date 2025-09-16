// 👇 ตัวอย่าง mock ตะกร้า (เดโม)
export const mockCart = {
  currency: "THB",
  items: [
    {
      key: "p101_black",
      productId: "p101",
      variantId: "black",
      variantDbId: "var_7f1a3c9e",
      sku: "NT-HE-0101-BL",
      name: "NovaTech Headphones X",
      image: "https://picsum.photos/seed/gadget-101-black/128/128",
      options: { color: "Black" },
      unitPriceSatang: 199000, // 1,990 บาท
      quantity: 1,
      addedAt: new Date().toISOString(),
    },
    {
      key: "p202_blue",
      productId: "p202",
      variantId: "blue",
      variantDbId: "var_8g2b5p1",
      sku: "SP-PW-0202-BLU",
      name: "Spark Power Bank 20,000mAh",
      image: "https://picsum.photos/seed/gadget-202-blue/128/128",
      options: { color: "Blue" },
      unitPriceSatang: 129000, // 1,290 บาท
      quantity: 2,
      addedAt: new Date().toISOString(),
    },
  ],
};
