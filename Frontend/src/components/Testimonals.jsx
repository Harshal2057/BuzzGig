import React from "react";
import { assets } from "../assets/assets";
import { CircleChevronRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import { reviews } from "../assets/assets";


const Cards = ({ rating , text , profilePic , name}) => {
    return (
      <div className="bg-blue-100 h-[350px] w-[700px] mx-4 p-10 flex flex-col justify-between rounded-3xl">
        
        {/* Top Section (Rating) */}
        <div className="flex gap-3">
          {Array.from({ length: rating }).map((_, i) => (
            <img key={i} src={assets.star} className="size-5" />
          ))}
        </div>

        {/* Middle Section (Text) */}
        <div className="font-outfit text-white text-xl flex-1 flex items-center">
          <span>{`"${text}"`}</span>
        </div>

        {/* Bottom Section (Profile + Comma) */}
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-4">
            <img className="rounded-full size-18" src={profilePic} alt="" />
            <p className="font-outfit font-semibold text-blue-75 text-2xl">{name}</p>
          </div>

          <div className="text-8xl font-anton text-transparent text-stroke-yellowBold leading-none">
            <p>,,</p>
          </div>
        </div>
      </div>
    );
};



const Testimonals = () => {

  return (
    <div
      className="min-h-screen w-screen overflow-x-hidden p-20"
      style={{
        backgroundColor: "#E3E3E3",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative flex items-center gap-3 bottom-4">
          <img src={assets.bulletThree} className="size-10" />
          <p className="font-anton text-2xl">Testimonal</p>
        </div>

        <div>
          <p className="font-anton text-7xl">WHAT OUR CLIENT SAYS</p>
        </div>

        {/* Button */}
        <div className="border-2 border-blue-100 flex gap-3 h-fit p-3 text-black font-anton text-xl self-end hover:bg-yellow-100 hover:text-black hover:scale-75 transition-all duration-400 ease-in-out">
          <p>View More</p>
          <CircleChevronRight color="#ffffff" />
        </div>
      </div>

      {/* Cards */}
        <div className="w-full mt-20">
            <Marquee
            pauseOnHover={true}           >
                  {reviews.map((review , index) => {
                     return <Cards key={index} rating={review.rating} text={review.review} profilePic={review.image} name={review.name}/>
                  })}
            </Marquee>
        </div>
    </div>
  );
};

export default Testimonals;
