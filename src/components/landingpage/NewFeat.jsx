import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "https://th.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-louis-vuitton-horizon-light-up-earphones---silver--QAB260_PM1_Worn%20view.png?wid=1180&hei=1180",
  "https://th.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-louis-vuitton-horizon-light-up-earphones---pink--QAB230_PM1_Other%20view.png?wid=1180&hei=1180",
  "https://th.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-louis-vuitton-horizon-light-up-earphones---red-to-orange-gradient--QAB270_PM1_Other%20view.png?wid=1180&hei=1180",
  "https://th.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-louis-vuitton-horizon-light-up-earphones---red--QAB240_PM1_Other%20view.png?wid=1180&hei=1180",
  "https://th.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-louis-vuitton-horizon-light-up-earphones---golden--QAB220_PM1_Other%20view.png?wid=1180&hei=1180",
];

export function NewFeat() {
  return (
    // เดิม
    // <Carousel className="w-full max-w-sm">
    //   <CarouselContent className="-ml-1">
    //     {Array.from({ length: 5 }).map((_, index) => (
    //       <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
    //         <div className="p-1">
    //           <Card>
    //             <CardContent className="flex aspect-square items-center justify-center p-6">
    //               <span className="text-2xl font-semibold">{index + 1}</span>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </CarouselItem>
    //     ))}
    //   </CarouselContent>
    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>

    // ปรับ Style
    // <Carousel className="w-[60rem] h-[25rem]">
    //   <CarouselContent className="flex gap-4">
    //     {Array.from({ length: 5 }).map((_, index) => (
    //       <CarouselItem key={index} className="basis-1/3">
    //         <Card className="w-[20rem] h-[25rem] flex items-center justify-center">
    //           <span className="text-2xl font-semibold">{index + 1}</span>
    //         </Card>
    //       </CarouselItem>
    //     ))}
    //   </CarouselContent>
    //   <CarouselPrevious />
    //   <CarouselNext />
    // </Carousel>

    <Carousel className="w-[60rem] h-[25rem]">
      <CarouselContent className="flex gap-4">
        {images.map((src, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <div className="">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-[20rem] h-[25rem] rounded-xl object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
