import { TextAnimate } from "@/components/magicui/text-animate";
import { demoItems } from "../../data/demoItems";
import FlowingMenu from "../ui/FlowingMenu";

const HotProductsV1 = () => {
  return (
    <div style={{ height: "600px", position: "relative" }} className="">
      <TextAnimate
        animation="blurInUp"
        by="text"
        className="text-4xl font-poppins font-bold text-center"
      >
        Hot Products
      </TextAnimate>
      <FlowingMenu items={demoItems} />
    </div>
  );
};

export default HotProductsV1;
