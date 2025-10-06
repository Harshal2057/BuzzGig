import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { FaHome } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDiagramProject } from "react-icons/fa6";
import { RiMessage3Fill } from "react-icons/ri";
import { FaGavel } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaMoneyBillTransfer, FaFileInvoiceDollar } from "react-icons/fa6";
import { IoSettingsSharp, IoHelpCircleSharp } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";

const DashBoardSidebar = () => {
  const [active, setActive] = useState("dashboard");

  const options = [
    { label: "Dashboard", value: "dashboard", icon: <MdSpaceDashboard />, route: "/freelancer-dashboard" },
    { label: "Home", value: "home", icon: <FaHome />, route: "/" },
    { label: "Projects", value: "projects", icon: <FaDiagramProject />, route: "/freelancer-dashboard" },
    { label: "Chats", value: "chats", icon: <RiMessage3Fill />, route: "/freelancer-dashboard" },
    { label: "Bid", value: "bid", icon: <FaGavel />, route: "/bid" },
  ];

  const financeOptions = [
    { label: "Transactions", value: "transactions", icon: <FaMoneyBillTransfer />, route: "/finance/transactions" },
    { label: "Invoices", value: "invoices", icon: <FaFileInvoiceDollar />, route: "/finance/invoices" },
  ];

  const accountOptions = [
    { label: "Logout", value: "logout", icon: <RiLogoutBoxRFill />, route: "/logout" },
    { label: "Settings", value: "settings", icon: <IoSettingsSharp />, route: "/settings" },
    { label: "Help", value: "help", icon: <IoHelpCircleSharp />, route: "/help" },
  ];

  return (
    <div
      className="h-full w-full rounded-2xl p-2 flex flex-col gap-6 overflow-hidden"
      style={{ backgroundColor: "#F8F8FF", backgroundImage: `url(${assets.eggShellBg})` }}
    >
      {/* Logo */}
      <div className="flex justify-center">
        <img src={assets.BuzzGig_Logo} className="size-10 bg-blue-100 p-1 rounded-lg" />
        <p className="relative font-racing-sans-one text-black text-4xl top-1.5">uzzGig</p>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-3">
          <p className="font-outfit text-lg text-gray-500">Menu</p>
          <div className="flex flex-col gap-3 relative left-6">
            {options.map((opt, index) => {
              const isActive = active === opt.value;
              return (
                <Link to={opt.route} key={index}>
                  <div
                    className={`font-outfit text-md rounded-2xl px-2 flex items-center gap-2 cursor-pointer ${
                      isActive ? "bg-blue-500 text-white" : "hover:bg-white text-gray-700"
                    }`}
                    onClick={() => setActive(opt.value)}
                  >
                    <p>{opt.icon}</p>
                    {opt.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Finance */}
        <div className="flex flex-col gap-3">
          <p className="font-outfit text-lg text-gray-500">Finance</p>
          <div className="flex flex-col gap-3 relative left-6">
            {financeOptions.map((fin, index) => {
              const isActive = active === fin.value;
              return (
                <Link to={fin.route} key={index}>
                  <div
                    className={`font-outfit text-md rounded-2xl px-2 flex items-center gap-2 cursor-pointer ${
                      isActive ? "bg-blue-500 text-white" : "hover:bg-white text-gray-700"
                    }`}
                    onClick={() => setActive(fin.value)}
                  >
                    <p>{fin.icon}</p>
                    {fin.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="mt-auto">
        <p className="font-outfit text-lg text-gray-500">Tools</p>
        <div className="flex flex-col gap-3 relative left-6">
          {accountOptions.map((tool, index) => {
            const isActive = active === tool.value;
            return (
              <Link to={tool.route} key={index}>
                <div
                  className={`font-outfit text-md rounded-2xl px-2 flex items-center gap-2 cursor-pointer ${
                    isActive ? "bg-blue-500 text-white" : "hover:bg-white text-gray-700"
                  }`}
                  onClick={() => setActive(tool.value)}
                >
                  <p>{tool.icon}</p>
                  {tool.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashBoardSidebar;
