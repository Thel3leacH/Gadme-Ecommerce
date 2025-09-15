import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/layout/Layout.jsx";
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
import { OrderConfirm1 } from "./views/OrderConfirm1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
      { path: "checkout", element: <ProductCheckout /> },
      { path: "cart", element: <Cart /> },
      { path: "admin", element: <AdminManageItem /> },
      { path: "order-confirm", element: <OrderConfirm1 /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
