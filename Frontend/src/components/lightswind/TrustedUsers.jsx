import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils"; // Adjust path if needed
import CountUp from "../../utils/CountUp.jsx";
import { useState } from "react";


export const TrustedUsers = ({
  avatars,
  rating = 5,
  totalUsersText = 1000, // ✅ default as number
  caption = "Trusted by",
  className = "",
  starColorClass = "text-yellow-400",
  ringColors = [],
     play = false,
   setPlay = () => {},
}) => {


 

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-6 bg-transparent text-foreground py-4 px-4",
        className
      )}
    >
      {/* Avatars */}
      <div className="flex -space-x-4">
        {avatars.map((src, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full overflow-hidden ring-1 ring-offset-2 ring-offset-black ${
              ringColors[i] || "ring-blue-900"
            }`}
          >
            <img
              src={src}
              alt={`Avatar ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy" // Add lazy loading
              decoding="async" // Suggest asynchronous decoding
            />
          </div>
        ))}
      </div>

      {/* Rating & Users */}
      <div className="flex flex-col items-start gap-1">
        {/* Stars */}
        <div className={`flex gap-1 ${starColorClass}`}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} fill="currentColor" className="w-4 h-4" />
          ))}
        </div>

        {/* Trusted users count */}
        <span className="flex items-center gap-2 text-blue-500 text-xs md:text-md font-medium">
          {caption}{" "}
            <div className="flex items-center">
            <CountUp
              value={5000}
              duration={3}
              animation="easeOutExpo"
              color="#F5F5DC"
              className="text-xl font-bold font-racing-sans-one"
              start={play}
            />
            <p className="font-extrabold text-3xl font-racing-sans-one text-yellow-100">
              +
            </p>
            </div>
            {" "}
          users
        </span>
      </div>
    </div>
  );
};
