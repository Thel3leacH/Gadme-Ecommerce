import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Api = "https://68996ee5fed141b96b9f7a90.mockapi.io/product-lists/product";

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
      alert("Failed");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //   const [like,setLike]=useState(false)
  //   const handleLike=(e)=>{
  //     e.preventDefault()
  //     setLike(true)
  //     if(like){<FaHeart className="text-[#9ACBD0] text-[1.5rem]" />}
  //   }

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
            className="w-[15rem] h-[25rem] rounded-[0.5rem] shadow-[5px_5px_10px_rgba(0,0,0,0.25)]"
          >
            <img
              src={product.productImg}
              alt="Product Image"
              className="w-[15rem] h-[15rem]"
            />
            <div className="m-[0.5rem] p-2.5">
              <h2>{product.productName}</h2>
              <div className="flex justify-between items-center mt-2 mb-2">
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
