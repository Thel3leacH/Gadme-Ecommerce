import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/layout/Layout.jsx";
import { ProductList } from "./views/ProductLists";
import { ProductPage } from "./views/ProductPage";
import About from "./views/About";
import Checkout from "./views/Checkout";
import AdminManageItem from "./components/admin/AdminManageItem";

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
      { path: "admin", element: <AdminManageItem /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
