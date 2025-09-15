import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Slider Syncing
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

const Api = "https://68996ee5fed141b96b9f7a90.mockapi.io/gameak/products";

export function ProductImage() {
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

  // Slider Syncing
  useEffect(() => {
    if (product) {
      if ($(".slider-for").hasClass("slick-initialized")) {
        $(".slider-for").slick("unslick");
      }
      if ($(".slider-nav").hasClass("slick-initialized")) {
        $(".slider-nav").slick("unslick");
      }

      $(".slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: ".slider-nav",
      });

      $(".slider-nav").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        dots: true,
        centerMode: true,
        focusOnSelect: true,
      });
    }

    // cleanup เวลาคอมโพเนนต์ถูก unmount
    return () => {
      if ($(".slider-for").hasClass("slick-initialized")) {
        $(".slider-for").slick("unslick");
      }
      if ($(".slider-nav").hasClass("slick-initialized")) {
        $(".slider-nav").slick("unslick");
      }
    };
  }, [product]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      {loading ? <div className="text-center">Loading⌛...</div> : <div></div>}
      {/* Section1-productImage */}
      <div className="w-[30rem] flex flex-col justify-center items-center gap-2">
        {/* slider-for */}
        <div className="slider-for w-[25rem]">
          <div>
            <img
              src={product.productImage}
              alt={`${product.productName} Picture-1`}
              className="rounded-xl"
            />
          </div>
          <div>
            <img
              src={product.productImage2}
              alt={`${product.productName} Picture-2`}
              className="rounded-xl"
            />
          </div>
          <div>
            <img
              src={product.productImage3}
              alt={`${product.productName} Picture-3`}
              className="rounded-xl"
            />
          </div>
          <div>
            <img
              src={product.productImage4}
              alt={`${product.productName} Picture-4`}
              className="rounded-xl"
            />
          </div>
          <div>
            <img
              src={product.productImage5}
              alt={`${product.productName} Picture-5`}
              className="rounded-xl"
            />
          </div>
        </div>
        {/* slider-nav */}
        <div className="slider-nav w-[25rem] cursor-pointer">
          <div>
            <img
              src={product.productImage}
              alt={`${product.productName} Picture-1`}
              className="w-[5.5rem] rounded-xl"
            />
          </div>
          <div>
            <img
              src={product.productImage2}
              alt={`${product.productName} Picture-2`}
              className="w-[5.5rem] rounded-xl"
            />
          </div>
          <div>
            <img
              src={product.productImage3}
              alt={`${product.productName} Picture-3`}
              className="w-[5.5rem] rounded-xl"
            />
          </div>
          <div>
            <img
              src={product.productImage4}
              alt={`${product.productName} Picture-4`}
              className="w-[5.5rem] rounded-xl"
            />
          </div>
          <div>
            <img
              src={product.productImage5}
              alt={`${product.productName} Picture-5`}
              className="w-[5.5rem] rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// {/* <div>
//             {productName.map((product) => (
//                 <div key={product.id} className="w-[30rem] flex flex-col justify-center items-center gap-2"> {/* ถูกไหม ไม่่แน่ใจว่า ต้องเพิ่มไรอีกไหม ???????????? */}
//                     {/* slider-for */}
//                     <div className="slider-for w-[25rem]">
//                         <div><img src={product.productImage} alt={`${product.productName} Picture-1`} className="rounded-xl" /></div>
//                         <div><img src={product.productImage2} alt={`${product.productName} Picture-2`} className="rounded-xl" /></div>
//                         <div><img src={product.productImage3} alt={`${product.productName} Picture-3`} className="rounded-xl" /></div>
//                         <div><img src={product.productImage4} alt={`${product.productName} Picture-4`} className="rounded-xl" /></div>
//                         <div><img src={product.productImage5} alt={`${product.productName} Picture-5`} className="rounded-xl" /></div>
//                     </div>
//                     {/* slider-nav */}
//                     <div className="slider-nav w-[25rem] cursor-pointer">
//                         <div><img src={product.productImage} alt={`${product.productName} Picture-1`} className="w-[5.5rem] rounded-xl" /></div>
//                         <div><img src={product.productImage2} alt={`${product.productName} Picture-2`} className="w-[5.5rem] rounded-xl" /></div>
//                         <div><img src={product.productImage3} alt={`${product.productName} Picture-3`} className="w-[5.5rem] rounded-xl" /></div>
//                         <div><img src={product.productImage4} alt={`${product.productName} Picture-4`} className="w-[5.5rem] rounded-xl" /></div>
//                         <div><img src={product.productImage5} alt={`${product.productName} Picture-5`} className="w-[5.5rem] rounded-xl" /></div>
//                     </div>
//                 </div>
//             ))}
//         </div> */}
