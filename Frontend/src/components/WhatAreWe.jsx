import React, { useRef, useState } from "react";
import { assets, logos } from "../assets/assets.js";
import Progressbar from "../utils/Progressbar";
import { CircleChevronRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

gsap.registerPlugin(ScrollTrigger);

const WhatAreWe = () => {
  const topRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerRef = useRef(null);

  const [play, setPlay] = useState(false);

  useGSAP(() => {
    // Force hardware acceleration and optimize for animation
    gsap.set([leftRef.current, rightRef.current, centerRef.current], {
      willChange: "transform, opacity",
      force3D: true, // Force hardware acceleration
      transformOrigin: "center center", // Set consistent transform origin
    });

    // Set initial states with smaller, smoother transforms
    gsap.set(leftRef.current, {
      x: -100,
      opacity: 0,
      rotationZ: 0.01, // Force hardware acceleration
    });

    gsap.set(rightRef.current, {
      x: 100,
      opacity: 0,
      rotationZ: 0.01, // Force hardware acceleration
      // REMOVED: onComplete: () => setPlay(true) - this was executing immediately
    });

    gsap.set(centerRef.current, {
      y: 60, // Reduced distance for smoother animation
      opacity: 0,
      scale: 0.95, // Slight scale for more fluid animation
      rotationZ: 0.01, // Force hardware acceleration
    });

    // Create smoother timeline with better easing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: topRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true, // Helps with fast scrolling
        preventOverlaps: true, // Prevents animation conflicts
      },
    });

    // Animate with smoother settings
    tl.to(leftRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out", // Smoother easing
    })
      .to(
        rightRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          // MOVED HERE: Set play to true when right animation completes
          onComplete: () => setPlay(true),
        },
        "-=1.0"
      )
      .to(
        centerRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4, // Slightly longer for smoother feel
          ease: "power3.out",
          onComplete: () => {
            // Clean up optimization properties
            gsap.set([leftRef.current, rightRef.current, centerRef.current], {
              willChange: "auto",
              clearProps: "transform", // Clean up any remaining transforms
            });
          },
        },
        "-=1.1"
      );
  }, []);

  return (
    <div
      className="relative min-h-screen w-screen overflow-x-hidden"
      style={{
        backgroundColor: "#E3E3E3",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      {/* main container */}
      <div className="w-full h-full flex flex-col ">
        {/* Top container */}
        <div ref={topRef} className="flex relative z-10 ">
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
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100">
                  <img src={assets.Speaker} className="size-19" />
                </div>
                <div className="text-3xl font-anton">
                  <p>Smart Hires Powered by AI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center div - Optimized for smooth animation */}
          <div
            ref={centerRef}
            className="relative flex justify-center items-center"
            style={{
              backfaceVisibility: "hidden", // Prevents flickering
              perspective: 1000, // Helps with 3D rendering
            }}
          >
            {/* Background circle with optimized rendering */}
            <div
              className="absolute top-3 w-[450px] h-[600px] border-8 border-black bg-yellow-100 rounded-full z-0"
              style={{
                willChange: "transform", // Optimize background circle too
                backfaceVisibility: "hidden",
              }}
            ></div>

            {/* Girl image with optimization */}
            <div className="relative z-10">
              <img
                src={assets.girl_two}
                className="size-[650px]"
                style={{
                  backfaceVisibility: "hidden", // Prevents flickering
                  imageRendering: "optimizeQuality", // Better image rendering
                }}
              />
            </div>
          </div>

          {/* Rightmost container */}
          <div
            ref={rightRef}
            className="relative right-8 gap-5 top-7 w-3/12 flex flex-col items-center justify-center "
          >
            {/* image */}
            <div className="w-[320px]">
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
                  start={play}
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
                  start={play}
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
                  start={play}
                />
              </div>
            </div>

            {/* Text */}
            <div className="w-5/6 text-gray-500 font-outfit text-lg">
              <p>
                Consectetuer adipiscing congue aptent placera senec efficitur
                aptent malesuada sit conubia tincidunt iaculis
              </p>
            </div>

            {/* Button */}
            <div className="relative left-10 self-start border-2 border-blue-100 flex gap-3 h-fit p-3 text-black font-anton text-xl hover:bg-yellow-100 hover:scale-75 transition-all duration-400 ease-in-out">
              <p>ALL SERVICES</p>
              <div>
                <CircleChevronRight color="#ffffff" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom container */}
        <div className="relative bottom-10 w-full flex justify-center my-10 ">
          <div className="flex w-10/12 p-5 rounded-2xl bg-gray-400 items-center justify-center">
            <Marquee speed={60} pauseOnHover={true} gradient={false}>
              {logos.map((logo, index) => (
                <div key={index} className="flex mx-10 p-5 h-[130px]">
                  <FontAwesomeIcon
                    icon={logo}
                    className="text-yellow-100 text-7xl"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatAreWe;
