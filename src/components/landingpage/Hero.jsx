import React from "react";
import Slogan from "../Slogan";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { Link } from "react-router-dom";
const Hero = ({ bgImage }) => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Hero section */}
        <main className="py-20 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white">Gad</span>
              me
            </div>
          </div>
          <Slogan
            text="Experience The Difference"
            className="text-5xl font-mono uppercase font-bold py-5 text-wrap"
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
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <Link to="/products">
            <InteractiveHoverButton>shop now</InteractiveHoverButton>
          </Link>
        </main>
      </div>
    </div>
  );
};
export default Hero;
