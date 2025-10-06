import  { useRef, useEffect, useState } from 'react';
import gsap from "gsap"

const SlidingButtonGroup = ({ buttons, initialActive = 0, className = "" , onChange }) => {
  const [activeIndex, setActiveIndex] = useState(initialActive);
  const sliderRef = useRef(null);
  const buttonRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize slider position
    if (buttonRefs.current[activeIndex] && sliderRef.current) {
      const activeButton = buttonRefs.current[activeIndex];
      gsap.set(sliderRef.current, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, []);

  const animateSlider = (targetIndex) => {
    if (targetIndex === activeIndex || !sliderRef.current || !buttonRefs.current[targetIndex]) return;

    const targetButton = buttonRefs.current[targetIndex];
    const currentButton = buttonRefs.current[activeIndex];
    
    const targetLeft = targetButton.offsetLeft;
    const targetWidth = targetButton.offsetWidth;
    const currentLeft = currentButton.offsetLeft;
    const currentWidth = currentButton.offsetWidth;
    
    const distance = Math.abs(targetLeft - currentLeft);
    const direction = targetLeft > currentLeft ? 1 : -1;
    const maxStretch = Math.max(targetWidth, currentWidth) + distance * 0.4;
    const stretchLeft = direction > 0 ? currentLeft : targetLeft;

    const containerWidth = containerRef.current.offsetWidth;
    const maxLeft = containerWidth - targetWidth - 6; // subtract padding (1.5rem ~ 6px)
    const targetLeftClamped = Math.min(targetLeft, maxLeft);


    // Create GSAP timeline for smooth animation
    const tl = gsap.timeline({
      ease: "power2.inOut"
    });

    // Phase 1: Stretch and prepare
    tl.to(sliderRef.current, {
      x: stretchLeft,
      width: maxStretch,
      duration: 0.15,
      ease: "power2.out"
    })
    // Phase 2: Move to target and contract
    .to(sliderRef.current, {
      x: targetLeftClamped,
      width: targetWidth,
      duration: 0.3,
      ease: "back.out(1.2)"
    });

    setActiveIndex(targetIndex);
    if (onChange) {
      onChange(buttons[targetIndex]); 
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative  bg-gray-200 border-2 border-gray-50 rounded-full  px-[1px] shadow-lg inline-flex ${className}`}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          ref={el => buttonRefs.current[index] = el}
          onClick={() => animateSlider(index)}
          className={`relative z-10 px-15 py-2 rounded-full font-medium transition-colors duration-300 cursor-pointer border-none outline-none ${
            activeIndex === index 
              ? 'text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {button}
        </button>
      ))}
      <div
        ref={sliderRef}
        className="absolute top-0.5  h-[calc(100%-4px)] bg-blue-500 rounded-full shadow-lg z-0"
      />
    </div>
  );
};

export default SlidingButtonGroup