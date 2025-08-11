import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { C2 } from "./testๆๆ/C2.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductList } from "./views/ProductLists.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <C2 />
      <ProductList/>
    </BrowserRouter>
  </StrictMode>
);
