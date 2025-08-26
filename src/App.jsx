import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout";
import { ProductList } from "./views/ProductLists";


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
