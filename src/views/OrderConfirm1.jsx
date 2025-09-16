import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function OrderConfirm1() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder({
      orderId,
      order_items: [
        {
          product_name: "iPhone 15",
          product_qty: 1,
          product_price: 35000,
          product_subtotal: 35000,
        },
        {
          product_name: "AirPods Pro",
          product_qty: 1,
          product_price: 9000,
          product_subtotal: 9000,
        },
      ],
      order_subtotal: 44000,
      order_shippingFee: 100,
      order_discount: 500,
      order_total: 43600,
      order_shipping_address: {
        address_firstname: "Gam",
        address_lastname: "Eak",
        address_phonenumber: "0800000000",
        address_subdistrict: "Bang Rak",
        address_district: "Bang Rak",
        address_province: "Bangkok",
        address_postalcode: "10500",
      },
      order_status: "confirmed",
      confirmedAt: new Date().toLocaleString("en-GB"), // เวลากดสั่งซื้อ
    });
  }, [orderId]);

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">Order Confirmed</h1>
        <p className="text-sm">Order ID: {order.orderId}</p>
        <p className="text-sm">Order Date: {order.confirmedAt}</p>

        <div className="border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Order Items</h2>
          {order.order_items.map((customerOrder, id) => (
            <div key={id} className="flex justify-between text-sm">
              <span>
                {customerOrder.product_name} × {customerOrder.product_qty}
              </span>
              <span>฿{customerOrder.product_subtotal.toLocaleString()}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>฿{order.order_subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>฿{order.order_shippingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-฿{order.order_discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>฿{order.order_total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          <p className="text-sm">
            {order.order_shipping_address.address_firstname}{" "}
            {order.order_shipping_address.address_lastname} •{" "}
            {order.order_shipping_address.address_phonenumber}
            <br />
            {order.order_shipping_address.address_subdistrict},{" "}
            {order.order_shipping_address.address_district},{" "}
            {order.order_shipping_address.address_province}{" "}
            {order.order_shipping_address.address_postalcode}
          </p>
        </div>

        <p className="text-xs">
          Current Status: {order.order_status}
        </p>
      </div>
    </div>
  );
}

// เชื่อม Api
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// export function OrderConfirm() {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`http://localhost:3001/api/orders/${orderId}`);
//         const data = await res.json();
//         setOrder(data);
//       } catch (err) {
//         console.error("Error fetching order:", err);
//       }
//     })();
//   }, [orderId]);

//   if (!order) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-4">
//         <h1 className="text-2xl font-bold">Order Confirmed</h1>
//         <p className="text-gray-500 text-sm">Order ID: {order._id}</p>
//         <p className="text-gray-500 text-sm">
//           Order Date: {new Date(order.createdAt).toLocaleString("en-GB")}
//         </p>

//         <div className="border rounded-xl p-4">
//           <h2 className="font-semibold mb-2">Order Items</h2>
//           {order.order_items.map((it, idx) => (
//             <div key={idx} className="flex justify-between text-sm">
//               <span>
//                 {it.product_name} × {it.product_qty}
//               </span>
//               <span>฿{it.product_subtotal.toLocaleString()}</span>
//             </div>
//           ))}
//           <div className="mt-3 pt-3 border-t text-sm space-y-1">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>฿{order.order_subtotal.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping Fee</span>
//               <span>฿{order.order_shippingFee.toLocaleString()}</span>
//             </div>

//             {/* ส่วนลด */}
//             {order.order_discount > 0 && (
//               <div className="flex justify-between">
//                 <span>Discount</span>
//                 <span>-฿{order.order_discount.toLocaleString()}</span>
//               </div>
//             )}
//             <div className="flex justify-between font-bold text-lg">
//               <span>Total</span>
//               <span>฿{order.order_total.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>

//         <div className="border rounded-xl p-4">
//           <h2 className="font-semibold mb-2">Shipping Address</h2>
//           <p className="text-sm text-gray-700">
//             {order.order_shipping_address.address_firstname}{" "}
//             {order.order_shipping_address.address_lastname} •{" "}
//             {order.order_shipping_address.address_phonenumber}
//             <br />
//             {order.order_shipping_address.address_subdistrict},{" "}
//             {order.order_shipping_address.address_district},{" "}
//             {order.order_shipping_address.address_province}{" "}
//             {order.order_shipping_address.address_postalcode}
//           </p>
//         </div>

//         <p className="text-xs text-gray-400">
//           Current Status: {order.order_status}
//         </p>
//       </div>
//     </div>
//   );
// }