import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home";
import Layout from "./components/Layout";
import { ProductList } from "./views/ProductLists";
import { ProductPage } from "./views/ProductPage";
import About from "./views/About";
import { HomeV3 } from "./views/HomeV3";

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
      { path: "/", element: <HomeV3 /> },
      // { path: "/", element: <HomeV1 /> },
      // { path: "/", element: <HomeV2 /> },
      { path: "about", element: <About /> },
      { path: "productlists", element: <ProductList /> },
      { path: "productlists/product/:id", element: <ProductPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
