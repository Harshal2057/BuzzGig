import { useRef } from "react";
import { assets } from "../assets/assets.js";
import { CircleChevronRight } from "lucide-react";
import { InteractiveCard } from "./lightswind/interactive-card.jsx";
import Cards from "./Cards.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const WhatweDo = () => {
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);


  return (
    <div
    ref={contentRef}
      className="min-h-screen w-screen overflow-x-hidden"
      style={{
        backgroundColor: "#252525",
        backgroundImage: `url(${assets.HeroBackground})`,
      }}
    >
      <div  className="mt-32">
        {/* Header */}
        <div className="flex gap-48 items-center">
          {/* What we do */}
          <div className="flex items-center self-start">
            <img src={assets.bulletTwo} className="size-18" />
            <p className="text-white text-2xl font-anton font-medium">
              What we do
            </p>
          </div>

          {/* Large Text */}
          <div ref={headingRef} className="text-center text-white font-anton">
            <p className="text-6xl font-bold">Designing for Seamless and</p>
            <br />
            <p className="text-6xl font-bold">Enjoyable Interaction</p>
          </div>

          {/* Button */}
          <div
            ref={buttonRef}
            className="border-2 border-yellow-100 flex gap-3 h-fit p-3 text-white font-anton text-xl self-end hover:bg-yellow-100 hover:text-black hover:scale-75 transition-all duration-400 ease-in-out"
          >
            <p>ALL SERVICES</p>
            <CircleChevronRight color="#ffffff" />
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="relative flex justify-center items-center gap-8 mt-16"
        >
          <Cards
            content="BRAND BUILDING & STRATEGY"
            textContent="Crafting powerful brand identities with strategies that connect, inspire trust, and drive sustainable growth."
            bgClasses="bg-gray-100"
            img2={assets.card_1}
          />
          <Cards
            content="CREATIVE DIGITAL SOLUTION"
            textContent="Transforming challenges into opportunities through creative digital solutions that inspire engagement and business growth."
            bgClasses="bg-blue-100"
            img1={assets.card_2}
          />
          <Cards
            content="MARKETING & CAMPAIGN"
            textContent="Strategic campaigns tailored to amplify your message, boost visibility, and accelerate your business objectives."
            bgClasses="bg-gray-100"
            img2={assets.card_3}
          />
        </div>
      </div>
    </div>
  );
};


export default WhatweDo;
