import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Api = "https://68996ee5fed141b96b9f7a90.mockapi.io/gameak/products";

export function ProductForm() {
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

  // const [form,setForm]=useState({product:productName.productName, color:"", quantity:""}) <<<<<<<<<<<<<<<<< ต่อตรงนี้ งง

  // Quantity
  const [Quantity, setQuantity] = useState(1);
  const handleQuantity = (e) => {
    if (e === "+") {
      setQuantity(Quantity + 1);
    } else if (e === "-" && Quantity > 1) {
      setQuantity(Quantity - 1);
    }
  };

  return (
    <div className="mx-auto w-[15rem] lg:w-[30rem]">
      {/* {loading ? <div className="text-center">Loading⌛...</div> : <div></div>} */}
      <div className="flex flex-col gap-5">
        <a href="" className="underline">
          {product.productCategory}
        </a>
        <h1 className="text-[2.5rem] font-bold">{product.productName}</h1>

        {/* color */}
        <p>Color</p>
        <select name="color" className="py-1.5 w-[12rem] border-1 rounded-md">
          {/* onChange= value= name="" */}
          {product.productChoice?.map((choice)=>(
            <option key={choice}>{choice}</option>
          ))}
          {/* <option value="black">Black</option>
          <option value="white">White</option> */}
        </select>

        {/* Quantity */}
        <p>Quantity</p>
        <div className="flex gap-5">
          <button
            onClick={() => handleQuantity("-")}
            className="cursor-pointer"
          >
            -
          </button>
          <span className="py-1.5 w-10 border-1 rounded-md text-center">
            {Quantity}
          </span>
          <button
            onClick={() => handleQuantity("+")}
            className="cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="my-[1rem] flex flex-col justify-center items-center gap-5">
          <img src="/guarantee.png" alt="" className="w-[25rem] lg:w-[30rem]" />
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
            <button className="py-1.5 w-[15rem] rounded-4xl bg-[#FAAE2B] text-[#006A71] cursor-pointer lg:w-[12rem]">
              Add to Cart
            </button>
            <button className="py-1.5 w-[15rem] rounded-4xl bg-[#006A71] text-white cursor-pointer lg:w-[12rem]">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// export function ProductForm({isEdit}){

//   const [form, setForm]=useState({productName:"",color:"", quality:""}) //productName:productName.productName
//   const {productId}=useParams()
//   useEffect(()=>{
//     if(isEdit&&productId){
//       axios
//       .get(`${Api}/${productId}`)
//       .then(response=>setForm({productName:response.data.productName, color:response.data.color, quality:response.data.quality}))
//     }
//   }, [isEdit, productId])

//   const navigate=useNavigate()

//   const handleChange=(e)=>{
//     setForm({...form, [e.target.productName]:e.target.value})
//   }

//   const handleSubmit=async(e)=>{
//         e.preventDefault()
//         if (isEdit) {
//             await axios.put(`${Api}/${productId}`, form) //เอาข้อมูลชุดใหม่ไปอัพเดทที่ database
//         } else {
//             await axios.post(Api, form)
//         }
//         navigate('/#')
//     }

//   return(
//     <div>
//       <h2>{Produ}</h2>
//     </div>
//   )
// }
