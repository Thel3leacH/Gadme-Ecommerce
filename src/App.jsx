// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./views/Home";
import { ProductList } from "./views/ProductLists";
import { ProductPage } from "./views/ProductPage";
import About from "./views/About";
import Checkout from "./views/Checkout";
import Payment from "./views/Payment";
import OrderConfirm from "./views/OrderConfirm";
import UserProfile from "./views/UserProfile";
import ProductCheckout from "./views/ProductCheckout";
import Cart from "./views/Cart";
import AdminManageItem from "./components/admin/AdminManageItem";

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
          <Toaster position="top-center" />
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
      { path: "productlists", element: <ProductList /> },
      { path: "productlists/product/:id", element: <ProductPage /> },
      { path: "payment", element: <Payment /> },
      { path: "orderconfirm", element: <OrderConfirm /> },
      { path: "userprofile", element: <UserProfile /> },
      { path: "product-checkout", element: <ProductCheckout /> }, // เลี่ยง path ชน "checkout"
      { path: "cart", element: <Cart /> },
      { path: "admin", element: <AdminManageItem /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
