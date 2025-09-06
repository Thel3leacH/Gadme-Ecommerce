import React from "react";
import { FaCarSide } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { IoWallet } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";

const Warranty = () => {
  return (
    <div className="md:flex justify-between px-8">
      <div className="flex gap-3">
        <FaCarSide className="w-auto h-15" />
        <article>
          <p className="text-xl font-bold text-chart-2">Free Shipping</p>
          <p>Free Shipping On All Order</p>
        </article>
      </div>
      <div className="flex gap-3">
        <GiMoneyStack className="w-auto h-15" />
        <article>
          <p className="text-xl font-bold text-chart-2">Safe Money</p>
          <p>30 Days Money Back</p>
        </article>
      </div>
      <div className="flex gap-3">
        <IoWallet className="w-auto h-15" />
        <article>
          <p className="text-xl font-bold text-chart-2">Secure Payment</p>
          <p>All Payment Secure</p>
        </article>
      </div>
      <div className="flex gap-3">
        <RiRobot3Fill className="w-auto h-15" />
        <article>
          <p className="text-xl font-bold text-chart-2">
            AI agent Support 24/7
          </p>
          <p>Technical Support 24/7</p>
        </article>
      </div>
    </div>
  );
};

export default Warranty;
