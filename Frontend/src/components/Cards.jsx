import React from "react";
import { InteractiveCard } from "./lightswind/interactive-card.jsx";
import { ArrowUpRight } from "lucide-react";


const Cards = ({ content = "", textContent = "", bgClasses = "", img1 , img2 } ) => {
  return (
    <div>
      <InteractiveCard
        borderRadius="0px"
        tailwindBgClass={`${bgClasses}`}
        width="w-[450px]"
        height="h-[600px]"
      >
        <div className="p-4 flex flex-col items-center ">

           {/* img1  */}
         {img1 && <div>
            <img src={img1} className="rounded-lg" />
          </div>}

        <div className="flex gap-3 items-center border-b-2 border-gray-500">
          <div className="relative pb-8 text-5xl text-white font-medium font-anton mt-8  ">
            <p>{content}</p>
          </div>

          <div className="bg-yellow-100 rounded-full">
            <ArrowUpRight size={80} strokeWidth={1} className="hover:rotate-45 transition-all duration-200 ease-"/>
          </div>
        </div>


          <div className="mt-5 text-xl text-white font-outfit w-11/12">
            <p>{textContent} </p>
          </div>

          {/* img 2 */}
          {img2 && <div className="relative top-7">
            <img src={img2} className="rounded-lg" />
          </div>}

        </div>
      </InteractiveCard>
      ;
    </div>
  );
};

export default Cards;
