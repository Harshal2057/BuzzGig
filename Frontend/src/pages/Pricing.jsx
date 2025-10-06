import { useRef, useLayoutEffect } from "react";
import React from "react";
import { assets } from "../assets/assets";
import CardSection from "../components/CardSection";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "../components/Footer.jsx"
import Extraordinary from "../components/Extraordinary.jsx";


gsap.registerPlugin(ScrollSmoother);

const Pricing = () => {

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

    useLayoutEffect(() => {
    if (wrapperRef.current && contentRef.current) {
      ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.5,
        effects: true,
      });
    }
  }, []);

  return (
    <div ref={wrapperRef} className="h-dvh w-screen overflow-hidden ">
        <div ref={contentRef} className="min-h-screen w-screen ">
            {/* Top container */}
            <div
              className="h-fit w-screen flex justify-center items-center p-40"
              style={{
                backgroundColor: "#0a1fc2",
                backgroundImage: `url(${assets.HeroBackgroundTwo})`,
              }}
            >
              <div className="text-center">
                <p className="text-8xl font-anton text-white">CHOOSE YOUR PLANS</p>
                <p className="font-anton text-yellow-100">PRICING PLAN</p>
              </div>

            </div>

            <CardSection />
            <Extraordinary />
            <Footer />

        </div>
    </div>
  );
};

export default Pricing;
