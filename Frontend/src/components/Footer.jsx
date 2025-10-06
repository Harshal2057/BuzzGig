import React from "react";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faBehance,
  faDribbble,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Marquee from "react-fast-marquee";

const Footer = () => {
  return (
    <div
      className="min-h-screen w-screen overflow-hidden relative " // Changed: overflow-hidden instead of overflow-x-hidden
      style={{
        backgroundColor: "#252525",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      {/* Main Container */}
      <div className="flex items-start gap-20 p-10 justify-between relative z-10"> {/* Added z-index */}
        {/* first */}
        <div className="flex items-center ">
          <img src={assets.bulletTwo} className="size-28" />
          <div className="flex items-center">
            <img src={assets.BuzzGig_Logo} className="size-14" />
            <p className="relative right-1.5 top-1 font-racing-sans-one text-yellow-100 text-5xl">
              uzzGig
            </p>
          </div>
        </div>

        {/* Second */}
        <div className="">
          <div className="text-4xl font-mediun text-yellow-100 font-anton ">
            <p>Pages</p>
          </div>
          {/* pages list */}
          <div>
            <ul className="text-gray-500 flex flex-col gap-5">
              <li>#</li>
              <li>About us</li>
              <li>Contact us</li>
              <li>Profile</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        {/* Third */}
        <div>
          <div className="text-4xl font-mediun text-yellow-100 font-anton ">
            <p>Connect with us</p>
          </div>

          <div>
            <ul className="flex flex-col gap-5">
              <li className="flex gap-3">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-yellow-100 text-2xl"
                />
                <p className="text-gray-500">Instagram</p>
              </li>
              <li className="flex gap-3">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="text-yellow-100 text-2xl"
                />
                <p className="text-gray-500">LinkedIn</p>
              </li>
              <li className="flex gap-3">
                <FontAwesomeIcon
                  icon={faBehance}
                  className="text-yellow-100 text-2xl"
                />
                <p className="text-gray-500">Behance</p>
              </li>
              <li className="flex gap-3">
                <FontAwesomeIcon
                  icon={faDribbble}
                  className="text-yellow-100 text-2xl"
                />
                <p className="text-gray-500">Dribble</p>
              </li>
              <li className="flex gap-3">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="text-yellow-100 text-2xl"
                />
                <p className="text-gray-500">Twitter</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Fourth */}
        <div className="w-3/6 flex flex-col gap-5">
          {/* Phone */}
          <div className="flex items-center gap-5">
            <p className="text-white text-4xl font-racing-sans-one font-semibold">
              +91 1234567890
            </p>
            <p className="text-gray-300 text-2xl font-racing-sans-one ">
              Phone Number
            </p>
          </div>
          {/* Email */}
          <div className="flex items-center gap-5">
            <p className="text-white text-4xl font-racing-sans-one font-semibold">
              buzzGig@gmail.com
            </p>
            <p className="text-gray-300 text-2xl font-racing-sans-one ">
              Email Address
            </p>
          </div>
          {/* text */}
          <div className="w-4/6 text-gray-300 font-outfit ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            rerum quam quidem temporibus, ut exercitationem?
          </div>
        </div>
      </div>

      {/* Fixed Marquee - Proper sizing and positioning */}
      <div className="absolute w-full bottom-24 rotate-3 overflow-hidden" style={{ height: '400px' }}> {/* Fixed height container */}
        <Marquee 
          style={{ 
            height: '400px', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center' // Center the text vertically
          }}
          speed={50} // Optional: control scroll speed
        >
          <span 
            className="flex items-center gap-10 leading-none text-stroke-yellow text-transparent font-racing-sans-one"
            style={{ 
              fontSize: '340px',
              lineHeight: '340px' // Match font size to prevent extra spacing
            }}
          >
            Buzzgig
            <img src={assets.bulletStroke} className="relative top-6 border-2 border-yellow-100 p-5 rounded-full size-[200px]"/>
          </span>
        </Marquee>
      </div>
    </div>
  );
};

export default Footer;