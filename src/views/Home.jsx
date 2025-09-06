import { NewFeat } from "../components/landingpage/NewFeat";
import { Review } from "../components/landingpage/Review";
import Slogan from "../components/landingpage/Slogan";
import Warranty from "../components/landingpage/Warranty";
import { TextAnimate } from "@/components/magicui/text-animate";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen justify-center items-center ">
      {/* Hard Code */}
      <main class="py-30 text-center">
        <div class="flex justify-center items-center mb-4">
          <div class="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
            <div class="material-symbols-outlined text-black">GadMe</div>
          </div>
        </div>
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
        <p class="text-gray-500 max-w-md mx-auto mb-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <Link to="productlists">
          <InteractiveHoverButton>shop now</InteractiveHoverButton>
        </Link>
      </main>
      <section class="py-16">
        <h2 class="text-3xl font-bold text-center mb-10">HOT PRODUCT</h2>
        <div class="bg-gray-800 rounded-xl p-8 grid grid-cols-2 gap-8 items-center">
          <div class="grid grid-rows-2 gap-6">
            <div class="bg-gray-700 rounded-lg p-4 flex items-center gap-4">
              <div class="w-24 h-24 bg-gray-600 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl text-gray-400">
                  headphones
                </span>
              </div>
              <div>
                <p class="text-xs text-teal-400">HEADLINE</p>
                <h3 class="font-semibold text-white mb-1">Hot</h3>
                <p class="text-sm text-gray-400 mb-2">Subline</p>
                <p class="text-xs text-gray-300 mb-3">
                  Something or descriptive text for the card goes here like a
                  pro.
                </p>
                <button class="bg-teal-500 text-white px-4 py-1 rounded-md text-xs font-semibold hover:bg-teal-600">
                  BUTTON
                </button>
              </div>
            </div>
            <div class="bg-gray-700 rounded-lg p-4 flex items-center gap-4">
              <div class="w-24 h-24 bg-gray-600 rounded-lg flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl text-gray-400">
                  laptop_mac
                </span>
              </div>
              <div>
                <p class="text-xs text-teal-400">HEADLINE</p>
                <h3 class="font-semibold text-white mb-1">Hot</h3>
                <p class="text-sm text-gray-400 mb-2">Subline</p>
                <p class="text-xs text-gray-300 mb-3">
                  Something or descriptive text for the card goes here like a
                  pro.
                </p>
                <button class="bg-teal-500 text-white px-4 py-1 rounded-md text-xs font-semibold hover:bg-teal-600">
                  BUTTON
                </button>
              </div>
            </div>
          </div>
          <div class="bg-gray-700 rounded-lg p-4">
            <div class="bg-gray-600 w-full h-64 rounded-lg flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-6xl text-gray-400">
                smartwatch
              </span>
            </div>
            <p class="text-xs text-teal-400">HEADLINE</p>
            <h3 class="font-semibold text-white mb-1">Hot</h3>
            <p class="text-sm text-gray-400 mb-2">Subline</p>
            <p class="text-sm text-gray-300 mb-4">
              Something or descriptive text for the card goes here like a pro.
            </p>
            <button class="bg-teal-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 w-full">
              BUTTON
            </button>
          </div>
        </div>
      </section>
      <section class="py-16">
        <h2 class="text-3xl font-bold text-center mb-10">
          New Feature New Product
        </h2>
        <div class="flex justify-center">
          <NewFeat />
        </div>
      </section>

      <Warranty />

      {/* Review  */}
      <section>
        <Review />
      </section>
    </div>
  );
};

export default Home;
