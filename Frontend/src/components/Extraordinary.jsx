import { useRef } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";

const Extraordinary = () => {

    const starRef = useRef(null)
  useGSAP(() => {
    gsap.to(starRef.current, {
      rotation: 360,
      duration: 10,        // speed of rotation
      repeat: -1,         // infinite loop
      ease: "linear",     // keeps speed constant
      transformOrigin: "50% 50%", // rotate around its center
    });
  });

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex justify-end items-end "
      style={{ backgroundImage: `url(${assets.pricingImgTwo})` }}
    >
      <div className="relative w-3/6 h-[450px] bg-gray-100 p-10 flex flex-col gap-3 right-28 bottom-28 overflow-clip">
                <div className="flex flex-col">
                <div>
                    <p className="text-7xl text-white font-anton leading-22">
                    LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER.
                    </p>
                </div>

                <div className="w-fit text-xl p-2 border-2 border-yellow-100 hover:bg-yellow-100 font-anton text-white hover:text-black">
                    <p className="">Contact us</p>
                </div>
                </div>

                {/* img */}
                <div ref={starRef} className="relative bottom-64 left-60">
                    <img src={assets.bulletTwo}/>
                </div>
      </div>
    </div>
  );
};

export default Extraordinary;
