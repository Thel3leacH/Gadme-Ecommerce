import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductsProvider } from "@/context/ProductsContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
        <Toaster position="top-center" />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>
);
