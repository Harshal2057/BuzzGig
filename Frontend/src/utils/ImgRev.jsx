import React, { useState } from "react";

const ImgRev = ({ photo , children }) => {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMovement(e) {
    setPos({ x: e.clientX, y: e.clientY });
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMovement}
      className="inline-flex"
    >
        {children}
      <img
        src={photo}
        style={{
          left: pos.x,
          top: pos.y,
        }}
        className={`fixed pointer-events-none w-40 h-40 rounded-xl shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all origin-center duration-500 ease-out border-8  border-white
              ${hovered ? "scale-150 opacity-100" : "scale-0 opacity-0"}`}
      />
    </div>
  );
};

export default ImgRev;
