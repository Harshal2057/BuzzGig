"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";

export const MorphingNavigation = ({
  links,
  scrollThreshold = 100,
  enablePageBlur = true,
  theme = "glass",
  backgroundColor,
  textColor,
  borderColor,
  initialTop = 70,
  compactTop = 20,
  animationDuration = 1,
  className,
  onLinkClick,
  onMenuToggle,
  customHamburgerIcon,
  disableAutoMorph = false,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  // detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // theme styles
  const getThemeStyles = useCallback(() => {
    switch (theme) {
      case "dark":
        return {
          nav: "bg-black/80 border-gray-800",
          text: "text-white",
          button: "bg-black/50 border-gray-700",
        };
      case "light":
        return {
          nav: "bg-white/80 border-gray-200",
          text: "text-gray-900",
          button: "bg-white/50 border-gray-300",
        };
      case "custom":
        return {
          nav: backgroundColor ? "" : "bg-white/5 border-white/10",
          text: textColor ? "" : "text-white",
          button: "bg-black/30 border-white/10",
        };
      case "glass":
      default:
        return {
          nav: "bg-white/5 border-white/10",
          text: "text-foreground",
          button: "bg-black/30 border-white/10",
        };
    }
  }, [theme, backgroundColor, textColor]);

  const themeStyles = getThemeStyles();

  // sticky handling
  useEffect(() => {
    if (disableAutoMorph && !isMobile) return;
    const handleScroll = () => {
      if (isMobile) {
        setIsSticky(true);
        setIsMenuOpen(false);
      } else {
        setIsSticky(window.scrollY >= scrollThreshold);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, disableAutoMorph, isMobile]);

  const handleMenuToggle = () => {
    const open = !isMenuOpen;
    setIsMenuOpen(open);

    if (isMobile && open) {
      setIsSticky(true);
    } else if (isMobile && !open) {
      setIsSticky(window.scrollY >= scrollThreshold);
    } else {
      setIsSticky(false);
    }
    onMenuToggle?.(open);
  };

  const handleLinkClick = (link) => {
    setIsMenuOpen(false);
    onLinkClick?.(link);
    navigate(link.href); // React Router navigation
  };

  // click outside closes menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const customStyles = {
    backgroundColor: theme === "custom" ? backgroundColor : undefined,
    color: theme === "custom" ? textColor : undefined,
    borderColor: theme === "custom" ? borderColor : undefined,
  };

  return (
    <>
      {/* overlay when menu open */}
      <AnimatePresence>
        {enablePageBlur && isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* top nav bar */}
      <motion.header
        className={cn("fixed top-4 z-50 w-full", className)}
        initial={false}
        animate={{
          top: isMobile ? compactTop : isSticky ? compactTop : initialTop,
        }}
        transition={{ duration: animationDuration }}
      >
        <motion.nav
          ref={navRef}
          className={cn(
            "flex justify-center items-center mx-auto fixed",
            themeStyles.nav,
            themeStyles.text,
            {
              "left-1/2 -translate-x-1/2": !isMobile && !isSticky,
              "left-0 right-0": isMobile || isSticky,
              "sm:w-[70px] sm:h-[70px] sm:rounded-full": isMobile,
            }
          )}
          animate={{
            height: isMobile ? 50 : isSticky ? 60 : 50,
            width: isMobile ? 60 : isSticky ? 70 : 700,
            borderRadius: 9999,
          }}
          transition={{ duration: animationDuration }}
          style={{ top: 0, ...customStyles }}
        >
          {/* desktop links */}
          <AnimatePresence>
            {!isMobile &&
              !isSticky &&
              links.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick(link)}
                    className="px-5 py-2.5 text-md font-medium tracking-wide hover:text-yellow-100"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* hamburger */}
          <motion.button
            onClick={handleMenuToggle}
            className={cn(
              "absolute w-[60px] h-[60px] rounded-full outline-none border cursor-pointer",
              themeStyles.button,
              {
                hidden: !isSticky && !isMobile,
                block: isMobile || isSticky,
              }
            )}
            animate={{ scale: isMobile || isSticky ? 1 : 0 }}
            transition={{ delay: isMobile || isSticky ? 0.2 : 0 }}
          >
            {customHamburgerIcon || (
              <div className="flex flex-col items-center justify-center h-full">
                <span className="block w-4 h-0.5 bg-current my-1" />
                <span className="block w-4 h-0.5 bg-current my-1" />
                <span className="block w-4 h-0.5 bg-current my-1" />
              </div>
            )}
          </motion.button>
        </motion.nav>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={cn(
                "p-8 rounded-2xl backdrop-blur-md border w-11/12 max-w-sm",
                themeStyles.nav,
                themeStyles.text
              )}
              style={customStyles}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col  space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    to={link.href}
                    onClick={() => handleLinkClick(link)}
                    className="font-medium text-xl font-racing-sans-one tracking-wide hover:scale-105 transition-transform hover:text-yellow-100"
                  >
                    {link.icon && (
                      <span className="inline-block mr-3">{link.icon}</span>
                    )}
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MorphingNavigation;
