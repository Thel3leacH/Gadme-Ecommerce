import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Api = "https://68996ee5fed141b96b9f7a90.mockapi.io/gameak/products";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Api}/${id}`);
      setProduct(response.data);
    } catch (error) {
      alert("Failed");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return (
    <div>
      {/* {loading ? <div className="text-center">Loading⌛...</div> : <div></div>} */}
      <div className="flex flex-col gap-10 lg:gap-15">
        {/* productSpec */}
        <table>
          <thead>
            <tr>
              <th className="p-2 w-[18rem] border-1 text-[1.25rem] text-left">
                Product Spec
              </th>
              <th className="p-2 w-[25rem] border-1 text-[1.25rem] text-left">
                {product.productName}
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(product.productSpec ?? {}).map(([spec, detail]) => (
              <tr key={spec}>
                <td className="p-1 border-1">{spec}</td>
                <td className="p-1 border-1">{Array.isArray(detail)? detail.join(", ") : detail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* productDescription */}
        <div className="lg:w-[45rem]">{product.productDescription}</div>
      </div>
    </div>
  );
}

{
  /*
<tbody>
  {Object.entries(product.productSpec).map(([spec, detail]) => {
    <tr key={spec}>
      <td>{spec}</td>
      <td>{Array.isArray(detail) ? detail.join(" ") : detail}</td>
    </tr>;
  })}
</tbody>;
*/
}
