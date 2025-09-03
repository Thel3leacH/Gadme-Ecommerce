import { NewFeat } from "../components/landingpage/NewFeat";
import { Review } from "../components/landingpage/Review";
import Hero from "../components/LandingPage/Hero";
import HotProductsV1 from "../components/landingpage/HotProductsV1";
import Warranty from "../components/landingpage/Warranty";

const HomeV1 = () => {
  return (
    <div>
      <Hero bgImage="/src/assets/HerosectionBG.jpg" />
      <HotProductsV1 />
      {/* <NewFeat /> */}
      <Warranty />
      <Review />
    </div>
  );
};

export default HomeV1;
