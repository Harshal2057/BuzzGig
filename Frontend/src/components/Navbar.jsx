import { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets.js";
import HamburgerMenuOverlay from "./lightswind/HamburgerMenuOverlay.jsx";
import {
  Home,
  Search,
  BookOpen,
  User,
  Phone,
  BriefcaseBusinessIcon,
  ShoppingBag,
  Info,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import MorphingNavigation from "../components/lightswind/morphing-navigation.jsx";
import { StoreContext } from "../context/StoreContext.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, logOut , token , profileUser} = useContext(StoreContext);

  const dropdownRef = useRef(null);
  const borderRef = useRef([]);
  const jobTitleRef = useRef([]);

  // useEffect(() => {
  //   console.log(profileUser);

  // } , [profileUser])

  useGSAP(() => {
    gsap.set(dropdownRef.current, {
      x: "100%",
    });

    borderRef.current.forEach((el) => {
      if (el) {
        gsap.set(el, { width: "0%" });
      }
    });
  });

  const handleIconClick = () => {
    gsap.to(dropdownRef.current, {
      x: "0%",
      duration: 0.8,
      ease: "power3.inOut",
    });
  };

  const handleCrossClick = () => {
    gsap.to(dropdownRef.current, {
      x: "100%",
      duration: 0.8,
      ease: "power3.inOut",
    });
  };

  const handleMouseEnter = (index) => {
    const borderEl = borderRef.current[index];
    const titleEl = jobTitleRef.current[index];

    if (borderEl) {
      gsap.to(borderEl, {
        width: "127%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    if (titleEl) {
      gsap.to(titleEl, {
        x: "30px",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  const handleMouseLeave = (index) => {
    const borderEl = borderRef.current[index];
    const titleEl = jobTitleRef.current[index];

    if (borderEl) {
      gsap.to(borderEl, {
        width: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    if (titleEl) {
      gsap.to(titleEl, {
        x: "0px",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  const menuItems = [
    { label: "Home", icon: <Home size={30} />, href: "/" },
    { label: "Find talen", icon: <Search size={30} />, href: "/search" },
    {
      label: "Find work", icon: <BriefcaseBusinessIcon size={30} />, href: "/all-jobs"  },
    {
      label: "profile",
      icon: <User size={30} />,
      onClick: () => console.log("Profile"),
    },
    { label: "About us", icon: <BookOpen size={30} />, href: "/about us" },
    { label: "Contact us", icon: <Phone size={30} />, href: "/contact us" },
  ];

const dropDownList = [
  ...(profileUser?.role === "freelancer"
    ? [{ label: "Profile", value: "profile", icon: "👤", route: "/freelancer-profile" }]
    : []),
  {
    label: "Dashboard",
    value: "dashboard",
    icon: "📌",
    route: profileUser?.role === "client" ? "/client-dashboard" : "/freelancer-dashboard",
  },
  { label: "Billing", value: "billing", icon: "💳", route: "/billing" },
  { label: "Upgrade", value: "upgrade", icon: "⚡", route: "/upgrade" },
  { label: "Support", value: "support", icon: "💬", route: "/support" },
  { label: "Logout", value: "logout", icon: "🚪", route: "/logout" },
];


  return (
    <div className=" absolute z-50 w-screen p-1 h-fit ">
      <nav className=" w-full mx-auto px-5 flex items-center justify-between sm:w-9/12 sm:px-0">
        {/* logo */}
        <div className="flex items-end  top-1">
          {/* image */}
          <div className="">
            <img src={assets.BuzzGig_Logo} className="size-12" />
          </div>

          {/* text */}
          <div>
            <p className="relative right-1.5 top-0.5 font-racing-sans-one text-yellow-100 f text-3xl">
              uzzGig
            </p>
          </div>
        </div>

        {/* Nav options */}
        <div className="hidden sm:block">
          <MorphingNavigation
            links={[
              {
                id: "Home",
                label: "HOME",
                href: "/",
                icon: <Home size={18} />,
              },
              {
                id: "talent",
                label: "FIND TALENT",
                href: "#shop",
                icon: <Search size={18} />,
              },
              {
                id: "work",
                label: "FIND WORK",
                href: "/all-jobs",
                icon: <BriefcaseBusinessIcon size={18} />,
              },
              {
                id: "pricing",
                label: "PRICING",
                href: "/pricing",
                icon: <Info size={18} />,
              },
              {
                id: "about",
                label: "ABOUT",
                href: "#about",
                icon: <BookOpen size={18} />,
              },
              {
                id: "contact",
                label: "CONTACT",
                href: "#contact",
                icon: <Phone size={18} />,
              },
            ]}
            theme="custom"
            backgroundColor="rgba(59, 130, 246 , 0)"
            textColor="#ffffff"
            borderColor="rgba(59, 130, 246, 0.3)"
            scrollThreshold={150}
            animationDuration={1.5}
            enablePageBlur={true}
            onLinkClick={(link) => handleNavigation(link)}
            onMenuToggle={(isOpen) => console.log("Menu:", isOpen)}
            className="font-racing-sans-one"
          />
        </div>

        {/* User Icon */}
        <div className=" top-1 left-[80%] hidden sm:block ">
          {isLoggedIn ? (
            <div onClick={handleIconClick}>
              <lord-icon
                src="https://cdn.lordicon.com/kdduutaw.json"
                trigger="hover"
                stroke="bold"
                state="hover-looking-around"
                colors="primary:#CAFA08,secondary:#CAFA08"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>
            </div>
          ) : (
            <div className="flex gap-3">
              {/* sign in */}
              <Link to="/auth">
                <div className="bg-yellow-100 p-1 rounded-2xl font-outfit font-semibold text-xl border-4 border-white hover:bg-white hover:border-yellow-100">
                  <p>SignIn</p>
                </div>
              </Link>

              {/* Login */}
              <Link to="/auth">
                <div className="bg-yellow-100 p-1 rounded-2xl font-outfit font-semibold text-xl border-4 border-white hover:bg-white hover:border-yellow-100">
                  <p>Login</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hamburger */}
      <div className="relative w-screen h-screen  sm:hidden font-racing-sans-one text-blue-100">
        <HamburgerMenuOverlay
          items={menuItems}
          buttonLeft="calc(100% - 50px)" // places the button visually
          spreadOriginX="calc(100% - 30px)" // custom prop for clip-path origi
        />
      </div>

      <div
        ref={dropdownRef}
        className="fixed top-0 right-0 w-3/12 bg-yellow-100 h-full z-[9999] overflow-hidden p-5"
      >
        {/* Cross */}
        <div onClick={handleCrossClick} className="absolute right-3 top-3">
          <FontAwesomeIcon icon={faXmark} className="text-3xl" />
        </div>

        <div className="relative w-full top-18 z-[1000] flex flex-col gap-3">
          {dropDownList.map((link, index) => {
            const handleClick = () => {
              if (link.value === "logout") {
                console.log("logout button clicked");
                
                logOut();
              }
              handleCrossClick();
            };

            return (
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                key={index}
                className="w-fit "
                onClick={handleClick}
              >
                {link.value === "logout" ? (
                  <p
                    ref={(el) => (jobTitleRef.current[index] = el)}
                    className="font-racing-sans-one text-6xl"
                  >
                    {link.label}
                  </p>
                ) : (
                  <Link to={link.route}>
                    <p
                      ref={(el) => (jobTitleRef.current[index] = el)}
                      className="font-racing-sans-one text-6xl"
                    >
                      {link.label}
                    </p>
                  </Link>
                )}
                {/* Border-b */}
                <div
                  ref={(el) => {
                    borderRef.current[index] = el;
                  }}
                  className="relative -left-6 w-full border-2 border-black"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
