import { items } from "../../data/items";
import Masonry from "../ui/Masonry";

const HotProducts = () => {
  return (
    <div>
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="random"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={true}
      />
    </div>
  );
};

export default HotProducts;
