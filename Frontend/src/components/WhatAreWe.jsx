import React, { useRef } from "react";
import { assets, logos } from "../assets/assets.js";
import Progressbar from "../utils/Progressbar";
import { CircleChevronRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatAreWe = () => {
  const topRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerRef = useRef(null);

  useGSAP(() => {
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: topRef.current,
        start: "top 80%",
        end: "top 10%",
        scrub:1,
        markers: true,
      },
    });

    t1.from(leftRef.current , {
      x:"-100",
      opacity:0,
      duration:4,
      ease:"power3.in"
    })
    .from(rightRef.current , {
      x:"100",
      opacity:0,
      duration:5,
      ease:"power3.in"
    },"<")
    .from(centerRef.current , {
      y:"200",
      opacity:0,
      duration:5,
      ease:"power3.in"
    },"<")
  });

  return (
    <div
      className="relative min-h-screen w-screen overflow-x-hidden "
      style={{
        backgroundColor: "#E3E3E3",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      {/* main container */}
      <div className="w-full h-full flex flex-col">
        {/* Top container */}
        <div ref={topRef} className="flex ">
          {/* Leftmost div */}
          <div
            ref={leftRef}
            className="relative left-28 top-8 w-4/12 flex flex-col gap-5 self-start"
          >
            {/* what we are */}
            <div className="w-fit flex items-center">
              <img src={assets.bulletTwo} className="size-18" />
              <p className="text-black text-2xl font-anton font-medium">
                What we are
              </p>
            </div>

            {/* heading */}
            <div className="relative w-fit text-7xl font-anton font-medium">
              <p>CREATIVE</p>
              <p>MEETS STRATEGY</p>
            </div>

            {/* sub text */}
            <div className="text-gray-500 text-xl w-5/6 font-outfit">
              <p>
                We create innovative digital solutions, blending creativity and
                technology to empower businesses worldwide.
              </p>
            </div>

            {/* icon & text */}
            <div className="flex flex-col gap-4">
              {/* First */}
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-100">
                  <img src={assets.bulbInsideBrain} className="size-19" />
                </div>
                <div className="text-3xl font-anton">
                  <p>Smart Hires Powered by AI</p>
                </div>
              </div>

              <div className="border-1 border-gray-400"></div>

              {/* Second */}
              <div className="flex items-center gap-4 ">
                <div className="rounded-full bg-blue-100">
                  <img src={assets.Speaker} className="size-19" />
                </div>
                <div className="text-3xl font-anton">
                  <p>Smart Hires Powered by AI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center div */}
          <div
            ref={centerRef}
            className="relative flex justify-center items-center"
          >
            <div className="absolute top-3 w-[400px] h-[700px] border-8 border-black bg-yellow-100 rounded-full z-0"></div>
            <div className="relative z-10">
              <img src={assets.girl_two} className="size-[650px]" />
            </div>
          </div>

          {/* Rightmost container */}
          <div
            ref={rightRef}
            className="relative right-8 gap-5 top-7 w-3/12 flex flex-col  items-center justify-center "
          >
            {/* image */}
            <div className=" w-[320px]">
              <img src={assets.quotes} />
            </div>

            {/* Progress bar */}
            <div>
              {/* Yellow bar */}
              <div className="relative">
                <div className="absolute font-anton">
                  <p>SUCCESSFUL CAMPAIGN LAUNCHES</p>
                </div>
                <Progressbar
                  width="w-[320px]"
                  height="h-[13px]"
                  percentage={95}
                  backgroundColor="bg-yellow-100"
                />
              </div>

              {/* blue bar */}
              <div>
                <div className="absolute font-anton">
                  <p>INOVATIVE SOLUTIONS</p>
                </div>
                <Progressbar
                  width="w-[320px]"
                  height="h-[13px]"
                  percentage={82}
                  backgroundColor="bg-blue-100"
                />
              </div>

              {/* black bar */}
              <div>
                <div className="absolute font-anton">
                  <p>HIGH IMPACT PROJECT</p>
                </div>
                <Progressbar
                  width="w-[320px]"
                  height="h-[13px]"
                  percentage={100}
                  backgroundColor="bg-black"
                />
              </div>
            </div>

            {/* Text */}
            <div className=" w-5/6 text-gray-500 font-outfit text-lg">
              <p>
                Consectetuer adipiscing congue aptent placera senec efficitur
                aptent malesuada sit conubia tincidunt iaculis
              </p>
            </div>

            {/* Button */}
            <div className="relative left-10 self-start border-2 border-blue-100  flex gap-3 h-fit p-3 text-black font-anton text-xl  hover:bg-yellow-100 hover:scale-75  transition-all duration-400 ease-in-out">
              <p>ALL SERVICES</p>
              <div>
                <CircleChevronRight color="#ffffff" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom container */}
        <div className="absolute z-50 bottom-0.5  flex justify-center">
          {/* Marque */}
          <div className="flex w-5/6 rounded-4xl bg-gray-400">
            <Marquee
              speed={90} // Scrolling speed
              pauseOnHover={true} // Pause when hovering
              gradient={false} // Disable gradient overlay
            >
              {logos.map((logo, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      marginRight: "20px", // Gap between items
                      color: "#24251E", // Text color
                      fontSize: window.innerWidth < 640 ? "44px" : "60px", // Font size
                      fontFamily: "'Anton', sans-serif", // Font family
                      fontWeight: "semibold",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <img src={logo} className="size-32 mr-14" />
                  </div>
                );
              })}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatAreWe;
