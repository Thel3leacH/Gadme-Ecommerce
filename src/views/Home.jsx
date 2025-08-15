import HotProducts from "../components/HotProducts";
import { Review } from "../components/Review";
import Slogan from "../components/Slogan";
import { TextAnimate } from "@/components/magicui/text-animate";

const Home = () => {
  return (
    <div className="min-h-screen justify-center items-center">
      <main className="flex flex-col">
        <section1 className="uppercase text-center text-wrap">
          <Slogan
            text="Experience The Difference"
            className="text-5xl font-bold py-5 text-wrap"
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
        </section1>
        <section2>
          <TextAnimate
            animation="blurInUp"
            by="text"
            className="text-4xl font-bold text-center"
          >
            Reviews
          </TextAnimate>
          <Review />
        </section2>
        <section3>
          <div className="">
            <TextAnimate
              animation="scaleUp"
              by="text"
              className="text-4xl font-bold text-center"
            >
              Hot Products
            </TextAnimate>
            <HotProducts />
          </div>
        </section3>
      </main>
    </div>
  );
};

export default Home;
