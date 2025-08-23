import React from "react";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram , faLinkedinIn , faBehance , faDribbble , faXTwitter } from "@fortawesome/free-brands-svg-icons"; 

const Footer = () => {
  return (
    <div
      className="min-h-screen w-screen overflow-x-hidden p-20"
      style={{
        backgroundColor: "#252525",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      {/* Main Container */}
      <div className="flex items-start gap-5 border-4 border-white ">
        {/* first */}
        <div className="flex items-center border-4 border-red-700">
          <img src={assets.bulletTwo} className="size-28" />
          <div className="flex items-center">
            <img src={assets.BuzzGig_Logo} className="size-14" />
            <p className="relative right-1.5 top-1 font-racing-sans-one text-yellow-100 text-5xl">
              uzzGig
            </p>
          </div>
        </div>

        {/* Second */}
        <div className="border-4 border-green-700">
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
                <FontAwesomeIcon icon={faInstagram} className="text-yellow-100 text-2xl"/>
                <p className="text-gray-500">Instagram</p>
              </li>
                           <li className="flex gap-3">
                <FontAwesomeIcon icon={faLinkedinIn} className="text-yellow-100 text-2xl"/>
                <p className="text-gray-500">LinkedIn</p>
              </li>
                            <li className="flex gap-3">
                <FontAwesomeIcon icon={faBehance} className="text-yellow-100 text-2xl"/>
                <p className="text-gray-500">Behance</p>
              </li>
                            <li className="flex gap-3">
                <FontAwesomeIcon icon={faDribbble} className="text-yellow-100 text-2xl"/>
                <p className="text-gray-500">Dribble</p>
              </li>
                            <li className="flex gap-3">
                <FontAwesomeIcon icon={faXTwitter} className="text-yellow-100 text-2xl"/>
                <p className="text-gray-500">Twitter</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
