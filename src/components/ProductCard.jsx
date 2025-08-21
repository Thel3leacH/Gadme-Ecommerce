import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Api = "https://68996ee5fed141b96b9f7a90.mockapi.io/gameak/products";

export function ProductCard() {
  const [produceName, setProduceName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(Api);
      setProduceName(response.data);
    } catch (error) {
      alert("Failed " + error.massage);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLike = (e, id) => {
    e.preventDefault();
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id], // สลับสถานะ liked ของ id นั้น
    }));
  };

  return (
    <div>
      {loading ? <div className="text-center">Loading⌛...</div> : <div></div>}
      <div className="flex flex-wrap justify-center gap-12 w-[75rem] mx-auto">
        {produceName.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="w-[15rem] h-[25rem] shadow-[5px_5px_10px_rgba(0,0,0,0.25)]"
          >
            <img
              src={product.productImage}
              alt="Product Image"
              className="w-[15rem] h-[15rem]"
            />
            <div className="m-[0.5rem] p-2.5">
              <h2 className="text-[1.15rem] font-bold">
                {product.productName}
              </h2>
              <div className="mt-3 mb-3 flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span className="bg-[#DBF6F9] rounded-[0.5rem] p-1.5">
                    {product.productCategory}
                  </span>
                </button>
                <button onClick={(e) => handleLike(e, product.id)}>
                  {likes[product.id] ? (
                    <FaHeart className="text-[#9ACBD0] text-[1.5rem]" />
                  ) : (
                    <FaRegHeart className="text-[#9ACBD0] text-[1.5rem]" />
                  )}
                </button>
              </div>
              <h3 className="font-medium">Price {product.productPrice} $</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
