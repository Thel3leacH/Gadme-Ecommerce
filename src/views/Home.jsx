import { Link } from "react-router-dom";
import { NewFeat } from "../components/landingpage/NewFeat.jsx";
import { Review } from "../components/landingpage/Review.jsx";
import Slogan from "../components/landingpage/Slogan.jsx";
import { TextAnimate } from "@/components/magicui/text-animate";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Warranty from "../components/landingpage/Warranty.jsx";
import ProductLists from "./ProductLists.jsx";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <main className="py-30 text-center">
        <div className="mb-4 relative flex justify-center items-center">
          <div className="absolute w-10 h-10 bg-teal-500 rounded-full"></div>
          <div className="relative z-10 text-white translate-x-5">GadMe</div>
          <img
            src="https://images.unsplash.com/photo-1709534644752-784aaf486afc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute top-[-57rem] w-[80rem] h-[80rem] rounded-full object-cover opacity-80 -z-10 object-center"
          />
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

        <p className="text-white max-w-md mx-auto mb-8">
          Stylish. Durable. Truly practical. Experience gadgets that make a real
          difference.
        </p>

        <Link to="products">
          <InteractiveHoverButton>shop now</InteractiveHoverButton>
        </Link>
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
        <div className="flex justify-center">
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
      <ProductLists />
      {/* <ProductCard /> */}

      {/* Warranty */}
      <TextAnimate
        animation="blurInUp"
        by="text"
        className="m-20 text-3xl font-bold text-center"
      >
        Our Trusts
      </TextAnimate>
      <Warranty />

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

export default Home;
