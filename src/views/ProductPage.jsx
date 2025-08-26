import { ProductDetail } from "../components/productPage/ProductDetail";
import { ProductForm } from "../components/productPage/ProductForm";
import { ProductImage } from "../components/productPage/ProductImage";

export function ProductPage() {
  return (
    <div className="m-1 flex flex-col justify-center items-center gap-10 lg:m-15 lg:gap-15">
      <div className="flex flex-col gap-5 lg:flex-row">
        <ProductImage />
        <ProductForm />
      </div>
      <ProductDetail />
    </div>
  );
}
