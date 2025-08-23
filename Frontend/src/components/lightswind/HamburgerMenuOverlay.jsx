"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";

export const HamburgerMenuOverlay = ({
  items = [],
  buttonTop = "30px",
  buttonLeft = "60px",         // Button position (visual only)
  spreadOriginX,               // NEW: Spread origin position
  buttonSize = "sm",
  buttonColor = "#CAFA08",
  overlayBackground = "#CAFA08",
  textColor = "#ffffff",
  fontSize = "xl",
  fontFamily = '"Krona One", monospace',
  fontWeight = "bold",
  animationDuration = 1.5,
  staggerDelay = 0.15,
  menuAlignment = "left",
  className,
  buttonClassName,
  menuItemClassName,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  menuDirection = "vertical",
  enableBlur = false,
  zIndex = 1000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const containerRef = useRef(null);

  // If spreadOriginX not provided, default to buttonLeft
  const originX = spreadOriginX || buttonLeft;

  const buttonSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  const fontSizes = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    "2xl": "text-6xl md:text-7xl",
  };

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) onOpen?.();
    else onClose?.();
  };

  const handleItemClick = (item) => {
    if (item.onClick) item.onClick();
    if (item.href && !item.onClick) {
      window.location.href = item.href;
    }
    if (!keepOpenOnItemClick) {
      setIsOpen(false);
      onClose?.();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className={cn("fixed inset-0", className)}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Krona+One:wght@400&display=swap');

        .hamburger-overlay-${zIndex} {
          position: relative;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: start;
          align-items: center;
          background: ${overlayBackground};
          z-index: ${zIndex};
          clip-path: circle(0px at ${originX} ${buttonTop});
          transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          ${enableBlur ? "backdrop-filter: blur(10px);" : ""}
        }

        .hamburger-overlay-${zIndex}.open {
          clip-path: circle(150% at ${originX} ${buttonTop});
        }

        .hamburger-button-${zIndex} {
          position: absolute;
          left: ${buttonLeft};
          top: ${buttonTop};
          transform: translate(-50%, -50%);
          border-radius: 20px;
          z-index: ${zIndex + 1};
          background: ${buttonColor};
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hamburger-button-${zIndex}:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }

        .hamburger-button-${zIndex}:focus {
          outline: 2px solid ${textColor};
          outline-offset: 2px;
        }

        .menu-item-${zIndex} {
  opacity: 0;
  transform: translateY(20px); /* start lower */
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.menu-item-${zIndex}.visible {
  opacity: 1;
  transform: translateY(0);
}


      `}</style>

      <div
        ref={navRef}
        className={cn(`flex flex-col items-center justify-center h-full hamburger-overlay-${zIndex}`, isOpen && "open")}
        aria-hidden={!isOpen}
      >
        <ul className={`mt-20 menu-items-${zIndex} ${menuDirection === "horizontal" ? "flex flex-wrap" : ""}`}>
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(`menu-item-${zIndex}`, fontSizes[fontSize], isOpen && "visible", menuItemClassName)}
              style={{ transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s" }}
              onClick={() => handleItemClick(item)}
              tabIndex={isOpen ? 0 : -1}
              role="button"
              aria-label={`Navigate to ${item.label}`}
            >
              <span className="flex items-center gap-3">
                {item.icon && <span className="menu-icon">{item.icon}</span>}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={cn(`hamburger-button-${zIndex}`, buttonSizes[buttonSize], buttonClassName)}
        onClick={toggleMenu}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
      >
        {customButton || (
          <div className="relative w-full h-full flex items-center justify-center">
            <Menu
              className={cn("absolute transition-all duration-300", isOpen ? "opacity-0 rotate-45 scale-0" : "opacity-100 rotate-0 scale-100")}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
            <X
              className={cn("absolute transition-all duration-300", isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-0")}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default HamburgerMenuOverlay;
