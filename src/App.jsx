import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./views/Home";
import ProductLists from "@/views/ProductLists";
import ProductPage from "@/views/ProductPage";
import About from "./views/About";
import Checkout from "./views/Checkout2";
import Payment from "./views/Payment";
import OrderConfirm from "./views/OrderConfirm";
import OrderHistory from "./views/OrderHistory";
import UserProfile from "./views/UserProfile";
import ProductCheckout from "./views/ProductCheckout";
import Cart from "@/views/Cart";
import AdminManageItem from "./components/admin/AdminManageItem";
import { Confirm } from "./views/Confirm";
import { AuthProvider } from "@/context/AuthContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

// ✅ ให้ Navbar/ทุกหน้าอยู่ใต้ Providers เหล่านี้
function RootProviders() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <Layout />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={10}
            containerStyle={{ top: 18, zIndex: 99999 }} // ลอยเหนือ UI
            toastOptions={{
              duration: 3500,
              // ทำให้ “ใหญ่ขึ้น” + สวยขึ้น ด้วยทั้ง style และ className (Tailwind)
              style: {
                padding: "14px 16px",
                fontSize: "16px",
                lineHeight: 1.4,
                borderRadius: "14px",
              },
              className:
                // พื้นหลังโปร่งนิด ๆ + เบลอ + ขอบสวย ๆ ที่เข้ากับ Light/Dark
                "max-w-[90vw] md:max-w-md bg-white/90 text-gray-800 border border-gray-200 shadow-xl backdrop-blur-md " +
                "dark:bg-neutral-900/80 dark:text-neutral-100 dark:border-neutral-800",
              // ปรับโทนแยกตามชนิด
              success: {
                duration: 2200,
                className:
                  "border-emerald-300/70 dark:border-emerald-700/70 " +
                  "bg-emerald-50/80 dark:bg-emerald-900/40",
                iconTheme: { primary: "#10b981", secondary: "white" }, // Emerald
              },
              error: {
                duration: 4000,
                className:
                  "border-rose-300/70 dark:border-rose-700/70 " +
                  "bg-rose-50/80 dark:bg-rose-900/40",
                iconTheme: { primary: "#ef4444", secondary: "white" }, // Red
              },
              loading: {
                duration: 8000,
                className:
                  "border-sky-300/70 dark:border-sky-700/70 " +
                  "bg-sky-50/80 dark:bg-sky-900/40",
                iconTheme: { primary: "#0ea5e9", secondary: "white" }, // Sky
              },
            }}
          />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootProviders />, // ← ครอบ Layout ด้วย Providers
    errorElement: (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">404 - Page Not Found 🙅‍♂️</h1>
      </div>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "checkout", element: <Checkout /> },
      { path: "products", element: <ProductLists /> },
      { path: "products/:name", element: <ProductPage /> },
      { path: "payment", element: <Payment /> },
      { path: "orderconfirm/:orderId", element: <OrderConfirm /> },
      { path: "userprofile", element: <UserProfile /> },
      { path: "product-checkout", element: <ProductCheckout /> }, // เลี่ยง path ชน "checkout"
      { path: "cart", element: <Cart /> },
      { path: "admin", element: <AdminManageItem /> },
      { path: "confirm", element: <Confirm /> },
      { path: "orderhistory", element: <OrderHistory /> },
      { path: "orderhistory/:orderId", element: <OrderConfirm /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
