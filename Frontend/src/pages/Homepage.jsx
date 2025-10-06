import { useRef, useLayoutEffect, useContext } from "react";
import Hero from "../components/Hero.jsx"
import Navbar from "../components/Navbar.jsx";
import Marquee from "react-fast-marquee";
import { assets } from "../assets/assets.js";
import WhatweDo from "../components/WhatweDo.jsx";
import WhatAreWe from "../components/WhatAreWe.jsx";
import TextScreen from "../components/TextScreen.jsx";
import Footer from "../components/Footer.jsx";
import Testimonals from "../components/Testimonals.jsx";
import Searching from "../components/Searching.jsx";
import gsap from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother";


gsap.registerPlugin(ScrollSmoother)

const Homepage = () => {

  

const wrapperRef = useRef(null);
  const contentRef = useRef(null);



const skills = [
    "Web Development",
    "UI/UX Design", 
    "SEO Optimization",
    "Content Writing",
    "Graphic Design",
    "Video Editing",
  ];

  return (
    <div ref={wrapperRef} className="min-h-screen w-screen overflow-hidden">
    <main ref={contentRef} className=" min-h-screen w-screen overflow-x-hidden bg-blue-75">
    
      
      {/* Hero Section */}
      <Hero />
      
      {/* Fixed Marquee strip (between Hero & WhatweDo) */}
      <div 
        className="absolute z-30 -mt-14 rotate-[2deg] w-full overflow-hidden"
        style={{
          backgroundColor: "#CAFA08",
          height: "80px", // Set fixed height
        }}
      >
        <Marquee 
          speed={90} 
          pauseOnHover={true} 
          gradient={false}
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center"
              style={{
                marginRight: "40px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <span
                style={{
                  color: "#24251E",
                  fontSize: window.innerWidth < 640 ? "44px" : "60px",
                  fontFamily: "'Anton', sans-serif",
                  fontWeight: "600",
                  lineHeight: "1",
                  whiteSpace: "nowrap",
                }}
              >
                {skill}
              </span>
              <img 
                src={assets.bullet} 
                alt="bullet"
                style={{
                  height: "auto",
                  maxHeight: "40px",
                  width: "auto"
                }}
              />
            </div>
          ))}
        </Marquee>
      </div>
      
      {/* Other Sections */}
      <WhatweDo />
      <WhatAreWe />
      <Searching />
      <TextScreen />
      <Testimonals />
      <Footer />
    </main>


    </div>
  );
}

export default Homepage