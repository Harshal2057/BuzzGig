import { useState } from "react";
import { assets } from "../assets/assets.js";
import HamburgerMenuOverlay from "./lightswind/HamburgerMenuOverlay.jsx";
import {
  Home,
  Search,
  BookOpen,
  User,
  Phone,
  BriefcaseBusinessIcon,
} from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems = [
    { label: "Home", icon: <Home size={30} />, href: "/" },
    { label: "Find talen", icon: <Search size={30} />, href: "/search" },
    {
      label: "Find work",
      icon: <BriefcaseBusinessIcon size={30} />,
      onClick: () => console.log("Profile"),
    },
    {
      label: "profile",
      icon: <User size={30} />,
      onClick: () => console.log("Profile"),
    },
    { label: "About us", icon: <BookOpen size={30} />, href: "/about us" },
    { label: "Contact us", icon: <Phone size={30} />, href: "/contact us" },
  ];

  return (
    <div className="absolute z-50 w-screen p-1 h-fit ">
      <nav className=" w-full mx-auto px-5 flex items-center justify-between sm:w-9/12 sm:px-0">
        {/* logo */}
        <div className="flex items-end">
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
          <ul className="flex text-white font-racing-sans-one gap-8 ">
            <li className="hover:text-yellow-100">Home</li>
            <li className="hover:text-yellow-100">Find talent</li>
            <li className="hover:text-yellow-100">Find work</li>
            <li className="hover:text-yellow-100">Pricing</li>
            <li className="hover:text-yellow-100">About us</li>
            <li className="hover:text-yellow-100">Contact us</li>
          </ul>
        </div>

        {/* User Icon */}
        <div className="relative top-1 hidden sm:block">
          {isLoggedIn ? (
            <lord-icon
              src="https://cdn.lordicon.com/kdduutaw.json"
              trigger="hover"
              stroke="bold"
              state="hover-looking-around"
              colors="primary:#CAFA08,secondary:#CAFA08"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          ) : (
            <div className="flex gap-3">
              {/* sign in */}
              <div className="bg-yellow-100 p-1 rounded-2xl font-outfit font-semibold text-xl border-4 border-white hover:bg-white hover:border-yellow-100">
                  <p>SignIn</p>
              </div>

              {/* Login */}
              <div  className="bg-yellow-100 p-1 rounded-2xl font-outfit font-semibold text-xl border-4 border-white hover:bg-white hover:border-yellow-100">
                  <p>Login</p>
              </div>
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
    </div>
  );
};

export default Navbar;
