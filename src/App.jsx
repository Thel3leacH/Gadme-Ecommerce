import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/views/Home";
import Layout from "@/components/Layout";
import ProductLists from "@/views/ProductLists";
import ProductPage from "@/views/ProductPage";
import About from "@/views/About";
import Checkout from "@/views/Checkout";

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
      { path: "/", element: <About /> },
      { path: "about", element: <About /> },
      { path: "checkout", element: <Checkout /> },
      { path: "products", element: <ProductLists /> },
      { path: "products/:name", element: <ProductPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
