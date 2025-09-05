// import { NewFeat } from "../components/landingpage/NewFeat";
// import { Review } from "../components/landingpage/Review";

// export function HomeV3() {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center">
//       <div className="mt-30 flex justify-center items-center gap-15">
//         <div className="w-[30rem] flex flex-col gap-10">
//             <h1 className="text-4xl md:text-5xl font-extrabold">GadMe Gadgets</h1>
//         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatum impedit a sed commodi odio excepturi quisquam! Necessitatibus doloremque, eum hic ut ducimus, molestiae libero magnam, deleniti deserunt odit quasi!</p>
//         <button class="w-[10rem] p-3 bg-teal-500 text-white rounded-xl font-semibold">
//           Shop now
//         </button>
//         </div>
//         <img
//           src="https://t4.ftcdn.net/jpg/06/91/17/95/360_F_691179587_QSctAaNAIbYMjexjEV3w8clmvzcXmJuU.jpg"
//           alt=""
//           className="w-[30rem] h-[40rem] rounded-xl object-cover"
//         />
//       </div>

//         <div className="">
//           <h2 className="m-10 text-4xl font-bold text-center">
//             New Feature New Product
//           </h2>
//           <NewFeat />
//         </div>
//         <div>
//           <h2 className="m-10 text-4xl font-bold text-center">Reviews</h2>
//           <Review />
//         </div>
//     </div>
//   );
// }

import { NewFeat } from "../components/landingpage/NewFeat";
import { Review } from "../components/landingpage/Review";
import Slogan from "../components/Slogan.jsx";
import { TextAnimate } from "@/components/magicui/text-animate";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ProductCard } from "../components/ProductCard.jsx";

export const HomeV3 = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <img
        src="https://images.unsplash.com/photo-1709534644752-784aaf486afc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="absolute top-[-45rem] w-[80rem] h-[80rem] rounded-full object-cover opacity-80 -z-10 object-center"
      />
      <main class="py-30 text-center">
        <div class="mb-4 relative flex justify-center items-center">
          <div class="absolute w-10 h-10 bg-teal-500 rounded-full"></div>
          <div class="relative z-10 text-white translate-x-5">GadMe</div>
        </div>

        <Slogan
          text="Experience The Difference"
          className="text-white text-5xl font-bold py-5 text-wrap"
          delay={400}
          duration={1}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <p class="text-white max-w-md mx-auto mb-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <InteractiveHoverButton>shop now</InteractiveHoverButton>
      </main>

      {/* New Feature New Product */}
      <section>
        <TextAnimate
          animation="blurInUp"
          by="text"
          className="m-20 text-3xl font-bold text-center"
        >
          New Feature New Product
        </TextAnimate>
        <div class="flex justify-center">
          <NewFeat />
        </div>
      </section>

      {/* ProductList */}
      <TextAnimate
        animation="blurInUp"
        by="text"
        className="m-20 text-3xl font-bold text-center"
      >
        Our Product
      </TextAnimate>
      <ProductCard />

      {/* Reviews */}
      <section>
        <TextAnimate
          animation="blurInUp"
          by="text"
          className="m-20 text-3xl font-bold text-center"
        >
          Reviews
        </TextAnimate>
        <Review />
      </section>
    </div>
  );
};
