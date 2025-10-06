import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { GiThorHammer } from "react-icons/gi";

const JobCard = ({ title, descriptions, budget }) => {
  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      className="bg-white  w-11/12 rounded-lg p-3"
    >
      {/* Main Container */}
      <div className="w-full h-full flex">
        {/* Left Container */}
        <div className=" w-5/6 flex flex-col gap-5">
          {/* Title and Description */}
          <div className="flex flex-col">
            <p className="font-outfit text-2xl hover:text-blue-85 hover:underline w-fit">
              {title}
            </p>
            <p className="font-outfit text-sm text-gray-300">{descriptions}</p>
          </div>

          {/* Budget and Bid */}
          <div className="flex gap-5">
            <div className="flex items-center gap-1">
              <FaDollarSign className="text-green-500" />
              <p className="text-lg">{budget}</p>
              <p className="text-gray-300 text-xs relative top-0.5">budget</p>
            </div>

            <div className="flex items-center gap-1">
              <GiThorHammer className="text-blue-85" />
              <p className="text-lg">10</p>
              <p className="text-gray-300 text-xs relative top-0.5">
                proposals
              </p>
            </div>
          </div>
        </div>

        {/* Right Container */}
          <div className="w-1/6 border-l border-blue-50">
            <div className="flex flex-col justify-center items-center gap-3 w-full h-full">
              <div>
                <p className="font-outfit text-sm">No Freelancer assigned yet</p>
              </div>

              <div className="w-full flex flex-col items-center gap-1">
                <button className="border-2 border-blue-500 rounded-lg w-5/6 p-1">
                  <p className="font-outfit">Chat</p>
                </button>

                <button className="bg-blue-85 rounded-lg w-5/6 p-1">
                  <p className="font-outfit text-white">Details</p>
                </button>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default JobCard;
