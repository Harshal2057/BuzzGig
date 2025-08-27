import React, { useState, useRef } from "react";
import { assets } from "../assets/assets";
import ImgRev from "../utils/ImgRev.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TextScreen = () => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);



  return (
    <div
      ref={containerRef}
      className="min-h-screen w-screen overflow-x-hidden flex justify-center items-center"
      style={{
        backgroundColor: "#252525",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      <div className="w-5/6 text-7xl text-white font-banger text-center leading-22">
        <div className="">
          <span className="line">
            "A space where{" "}
            <div className="bg-blue-100 w-fit p-3 rounded-full inline-flex -rotate-2 transition-all hover:rotate-0">
              <img src={assets.ideas} className=" w-2xl " />
            </div>{" "}
          </span>
          <br />
          <span className="line inline-flex items-baseline">
            A place to showcase{" "}
            <ImgRev photo={assets.imgRev}>
              <span className="mx-4 inline-block align-middle">skills,</span>
            </ImgRev>{" "}
            discover projects,
          </span>
          
          <span className="line">
          and{" "}
          <span className="text-transparent text-stroke">
            connect with the right people.
          </span>{" "}
          Whether it’s
          </span>
          <span className="line">
           <ImgRev photo={assets.imgRev_2}>creative,</ImgRev>{" "}
          technical, or{" "}
          <div className="text-yellow-100 inline-flex rotate-2 transition-all hover:rotate-0">
            professional work,
          </div>{" "}
          every{" "}
          </span>

          <span className="line inline-flex items-baseline">
          <div className="bg-yellow-100 py-1 px-4 text-transparent text-stroke-2 rounded-full inline-flex transition-all hover:-translate-x-3">
            talent
          </div>{" "}
          can find its match and every project can 
          </span >

          <span className="line">
          find its{" "}
          <ImgRev photo={assets.imgRev_3}>
            <span className="text-transparent text-stroke-yellow inline-block -rotate-6 transition-all hover:rotate-0">
              solution ."
            </span>
          </ImgRev>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextScreen;
