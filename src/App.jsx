import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
// import Home from "./views/Home";

import { ProductList } from "./views/ProductLists";
import AddressForm from "./components/AddressForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        // element: <Home />,
        element: <AddressForm />,
      },
      {
        path: "productlists",
        element: <ProductList />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
