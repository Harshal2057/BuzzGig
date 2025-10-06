import React, { useRef, useState , useContext } from "react";
import { assets } from "../assets/assets";
import { FaPencilAlt } from "react-icons/fa";
import FileUploader from "./FileUploader";
import { StoreContext } from "../context/StoreContext.jsx";

const ProfileHeader = () => {

  const{ setUpdateBackGroundPic , setUpdateProfilePic , freelancerProfile , profileUser , setProfileInput , } = useContext(StoreContext)
  


  return (
    <div className="relative">
      <div className="overflow-hidden">
        {/* Main Conatiner */}
        <div className="relative bg-white-100 h-[450px] w-[800px] rounded-2xl">
          {/* BackGround pic */}
          <div className="relative h-6/12 rounded-t-2xl overflow-hidden">
            <img
              src={freelancerProfile?.backgroundPic || assets.backgroundDefaultImg}
              className="h-full w-full object-cover relative z-0"
            />
            <div
              onClick={() => setUpdateBackGroundPic(true)}
              className="absolute z-10 top-3 right-3 border-2 border-white rounded-full p-2"
            >
              <FaPencilAlt className="size-6 text-white  cursor-pointer" />
            </div>

          </div>

          {/* Profile Pic */}
          <div onClick={() => setUpdateProfilePic(true)} className="absolute h-45 w-45 rounded-full bottom-42 left-5 overflow-hidden flex justify-center items-center ">
            <img
              src={ profileUser?.profilePic || assets.userDefaultImage}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and info */}
          <div className="relative top-16 px-10 w-full  flex justify-between">
                {/* Info */}
                <div>
                  {/* name */}
                  <p className="text-2xl font-semibold font-outfit">
                    {freelancerProfile?.name || "Username"}
                  </p>
                  <p className="font-outfit text-gray-300 text-md">
                    {freelancerProfile?.email || "User-Email"}
                  </p>
                  <p className="font-outfit text-gray-300 text-md">
                  {freelancerProfile?.location?.city && freelancerProfile?.location?.country
                    ? `${freelancerProfile.location.city}, ${freelancerProfile.location.country}`
                    : "Location not available"}
                  </p>
                  <a
                    href={`${freelancerProfile?.github || ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-outfit text-gray-300 text-md"
                  >
                    {freelancerProfile?.github || "User-gitHub"}
                  </a>

                  <p className="font-outfit text-gray-300 text-md">
                    <span className="text-blue-85 font-semibold">Joined in</span>{" "}
                      {freelancerProfile?.createdAt
                        ? new Date(freelancerProfile.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })
                        : ""}
                  </p>
                </div>

                {/* Pencil Edit */}
                <div
                onClick={() => {
                  setProfileInput("Info")
                }}
                className="h-fit border-2 w-fit p-1.5 rounded-full hover:bg-black hover:text-white">
                  <FaPencilAlt className="size-5" />
                </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProfileHeader;
