import React, { useRef, useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FaHome } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";
import { FaGavel } from "react-icons/fa6";
import { useState } from "react";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { JobStoreContext } from "../../context/JobStore";
import { useNavigate } from "react-router-dom";

const SidebarClient = () => {
  const { client, findClientJobs } = useContext(JobStoreContext);

  const navigate = useNavigate();

  const lowerRef = useRef(null);
  const [isActive, setIsActive] = useState("dashboard");

  useEffect(() => {
    if (lowerRef.current) {
      gsap.set(lowerRef.current, {
        clipPath: "path('M0 35 0 35Q167 7 249 172L250 228V504H0L0 35Z')",
      });
    }
  }, []);

  const options = [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: <MdSpaceDashboard />,
      route: "/client-dashboard",
    },
    { label: "Home", value: "home", icon: <FaHome />, route: "/" },
    {
      label: "Jobs",
      value: "Jobs",
      icon: <BsFillBriefcaseFill />,
      route: "/client-job",
    },
    {
      label: "Chats",
      value: "chats",
      icon: <RiMessage3Fill />,
      route: "/client-chats",
    },
    { label: "Bid", value: "bid", icon: <FaGavel />, route: "/bid" },
  ];

  useEffect(() => {
    if (isActive === "Jobs" && client?._id) {
      findClientJobs(client._id);
      navigate("/client-job"); // navigate after calling fetch
    }
  }, [isActive, client?._id]);



  return (
    <div
      style={{
        backgroundColor: "#F8F8FF",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
      className="relative w-full h-full rounded-2xl overflow-hidden"
    >
      {/* Main Container */}
      <div className="w-full h-full  rounded-2xl flex flex-col ">
        {/* logo */}
        <div className=" w-full mt-3 flex justify-center  ">
          <img
            src={assets.BuzzGig_Logo}
            className="size-10 bg-blue-100 rounded-lg p-1"
          />
          <p className="font-racing-sans-one text-4xl">uzzGig</p>
        </div>

        {/* name & profile*/}
        <div className="mt-7 flex flex-col items-center self-center ">
                {/* profile pic */}
                <div className="size-28  rounded-full bg-blue-700 flex justify-center items-center">
                  <p className="font-outfit text-6xl text-gray-50">
                    {" "}
                    {
                      client?.fullName
                        ?.split(" ") 
                        .map((word) => word[0])
                        .join("") 
                        .toUpperCase() 
                    }
                  </p>
                </div>

                <p className="text-2xl font-outfit mt-2">{client?.fullName}</p>
        </div>

        {/* Menu Options */}
        <div className="mt-8">
          <div className="self-end">
            <p className="font-outfit text-lg text-gray-500">Menu</p>
          </div>

          <div className="flex flex-col gap-6 ml-16">
            {options.map((opt, index) => {
              return (
                <div
                  onClick={() => {
                    setIsActive(opt.value);
                    navigate(opt.route);
                  }}
                  key={index}
                >
                  <div
                    className={`font-outfit text-md rounded-2xl px-2 flex items-center gap-2 cursor-pointer ${
                      isActive === opt.value
                        ? "bg-blue-500 text-white"
                        : "hover:bg-white text-gray-700"
                    }`}
                  >
                    <p>{opt.icon}</p>
                    {opt.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarClient;
