import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useLayoutEffect } from "react";
import CountUp from "./CountUp.jsx";

const Progressbar = ({
  percentage = 95,
  width = "w-[320px]",
  height = "h-6",
  backgroundColor = "bg-black",
}) => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    if (containerRef.current && progressRef.current) {
      const containerWidth = containerRef.current.offsetWidth; // in px
      const percentageToPixel = (percentage / 100) * containerWidth;

      gsap.to(progressRef.current, {
        width: `${percentageToPixel}px`,
        duration: 2,
        ease: "power2.out",
      });
    }
  });

  return (
    <div className="flex flex-col">
      <div className="relative self-end font-anton right-6">
        <CountUp
          value={percentage}
          duration={3}
          animation="easeOutExpo"
          color="#000000"
          className=" font-anton"
        />
      </div>
      <div className="relative">
        {/* Outer bar */}
        <div
          ref={containerRef}
          className={`bg-white rounded-full ${width} ${height}`}
        />

        {/* Animated inner bar */}
        <div
          ref={progressRef}
          className={`absolute top-0 left-0 rounded-full ${height} ${backgroundColor}`}
          style={{ width: "0px" }}
        />
      </div>
    </div>
  );
};

export default Progressbar;
