export const mockitems = [
  {
    id: "1",
    productname: "Wireless Headphones",
    description:
      "High quality over-ear wireless headphones with noise cancellation.",
    brand: "SoundMax",
    modelname: "SMX-1000",
    warrantyinfo: "1 Year Warranty",
    relatedproduct: ["Wireless Earbuds", "Bluetooth Speaker"],
    features: [
      "Noise Cancellation",
      "Bluetooth 5.0",
      "20h Battery Life",
      "Fast Charging",
    ],
    variances: [
      {
        color: "Black",
        image: ["https://via.placeholder.com/150"],
        stock: 20,
        price: 120,
      },
      {
        color: "White",
        image: ["https://via.placeholder.com/150"],
        stock: 15,
        price: 125,
      },
    ],
    createdAt: "2025-08-16T10:00:00.000Z",
    updatedAt: "2025-08-16T10:00:00.000Z",
  },
  {
    id: "2",
    productname: "Gaming Mouse",
    description: "Ergonomic RGB gaming mouse with programmable buttons.",
    brand: "ProGamer",
    modelname: "PGM-200",
    warrantyinfo: "2 Years Warranty",
    relatedproduct: ["Gaming Keyboard", "Mouse Pad"],
    features: [
      "RGB Lighting",
      "Adjustable DPI",
      "6 Programmable Buttons",
      "Lightweight Design",
    ],
    variances: [
      {
        color: "Black",
        image: ["https://via.placeholder.com/150"],
        stock: 50,
        price: 45,
      },
      {
        color: "Red",
        image: ["https://via.placeholder.com/150"],
        stock: 30,
        price: 50,
      },
    ],
    createdAt: "2025-08-16T10:10:00.000Z",
    updatedAt: "2025-08-16T10:10:00.000Z",
  },
  {
    id: "3",
    productname: "Mechanical Keyboard",
    description: "Compact mechanical keyboard with hot-swappable switches.",
    brand: "KeyTech",
    modelname: "KT-75",
    warrantyinfo: "1 Year Warranty",
    relatedproduct: ["Keycaps Set", "Wrist Rest"],
    features: [
      "Hot-Swappable Switches",
      "Compact 75% Layout",
      "Customizable RGB",
      "Detachable USB-C Cable",
    ],
    variances: [
      {
        color: "White",
        image: ["https://via.placeholder.com/150"],
        stock: 25,
        price: 89,
      },
      {
        color: "Black",
        image: ["https://via.placeholder.com/150"],
        stock: 40,
        price: 85,
      },
    ],
    createdAt: "2025-08-16T10:20:00.000Z",
    updatedAt: "2025-08-16T10:20:00.000Z",
  },
];

export default items;
