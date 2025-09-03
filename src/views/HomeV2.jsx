import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { GiMoneyStack } from "react-icons/gi";
import { ProductCard } from "../components/ProductCard";

// Ai suggest landing page
export default function HomeV2() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Discover Smart Gadgets with
          <span className="text-chart-2">AI-Powered Picks</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          GadMe helps you find the perfect gadgets — recommended just for you.
        </p>
        <Link to="productlists">
          <Button size="lg" className="rounded-2xl px-6">
            Shop now
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Why GadMe?</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Star className="mx-auto mb-4 text-chart-2" size={36} />
              <h4 className="text-lg font-semibold">AI Recommendations</h4>
              <p className="text-gray-600 mt-2">
                Personalized product suggestions tailored to your lifestyle.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <ShoppingCart className="mx-auto mb-4 text-chart-2" size={36} />
              <h4 className="text-lg font-semibold">Easy Shopping</h4>
              <p className="text-gray-600 mt-2">
                Smooth shopping experience with secure checkout.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Star className="mx-auto mb-4 text-chart-2" size={36} />
              <h4 className="text-lg font-semibold">Top Gadgets</h4>
              <p className="text-gray-600 mt-2">
                Explore the latest and trendiest gadgets in one place.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <GiMoneyStack className="mx-auto mb-4 text-chart-2" size={40} />
              <h4 className="text-lg font-semibold">Safe Money</h4>
              <p className="text-gray-600 mt-2">
                Customer can give a 30 days money back
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export default function HomeV2() {
//   return (
//     <section className="w-full bg-background text-chart-2 py-10">
//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8">
//           Discover the Latest Gadgets
//         </h1>

//         <Carousel className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
//           <CarouselContent>
//             <CarouselItem>
//               <img
//                 src="/images/gadget1.jpg"
//                 alt="Gadget 1"
//                 className="w-full h-[400px] object-cover"
//               />
//             </CarouselItem>
//             <CarouselItem>
//               <img
//                 src="/images/gadget2.jpg"
//                 alt="Gadget 2"
//                 className="w-full h-[400px] object-cover"
//               />
//             </CarouselItem>
//             <CarouselItem>
//               <img
//                 src="/images/gadget3.jpg"
//                 alt="Gadget 3"
//                 className="w-full h-[400px] object-cover"
//               />
//             </CarouselItem>
//             <CarouselItem>
//               <img
//                 src="/images/gadget4.jpg"
//                 alt="Gadget 4"
//                 className="w-full h-[400px] object-cover"
//               />
//             </CarouselItem>
//           </CarouselContent>

//           {/* ปุ่มเลื่อน */}
//           <CarouselPrevious className="bg-white/70 hover:bg-white text-black" />
//           <CarouselNext className="bg-white/70 hover:bg-white text-black" />
//         </Carousel>
//       </div>
//     </section>
//   );
// }
