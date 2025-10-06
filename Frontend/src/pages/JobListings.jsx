import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { IoSearchOutline } from "react-icons/io5";
import { JobStoreContext } from "../context/JobStore";
import AllJobCard from "../components/AllJobCard";
import JobDisplay from "../components/JobDisplay.jsx"
import { RxCross2 } from "react-icons/rx";
import Chat from "../components/Chatting/Chat";
import { StoreContext } from "../context/StoreContext.jsx";

const JobListings = () => {
  const { allJobs } = useContext(JobStoreContext);
  const {authUser} = useContext(StoreContext)

  const [activeJob, setActiveJob] = useState(null);
  const [activeChat , setActiveChat] = useState(false);

  return (
    <div className="relative min-h-screen w-screen bg-gray-200">
      {/* Main Container */}
      <div className={`w-full h-full `} >
        {/* Upper div */}
        <div
          style={{
            backgroundColor: "#0A1FC2",
            backgroundImage: `url(${assets.eggShellBg})`,
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          }}
          className="w-full h-65 flex flex-col gap-3 justify-end items-center  top-0 z-40"
        >
          <div className="w-4/6  flex flex-col gap-3 ">
            {/* Headline */}
            <div className="flex justify-center items-center self-start ml-5">
              <p className="font-outfit text-5xl text-white">
                Find Your Dream Job
              </p>
              <img
                src={assets.bulletTwo}
                alt="bullet"
                className="w-12 h-12 ml-2 pointer-events-none"
              />
            </div>

            {/* Input */}
            <div className="relative z-10 flex items-center w-full h-14 rounded-full border-2 border-white bg-white px-3 mb-5 mx-auto">
              <IoSearchOutline className="text-gray-500 mr-3 size-6  " />
              <input
                type="text"
                placeholder="Enter the job title"
                name="jobSearch"
                className="flex-1 bg-transparent outline-none font-outfit text-gray-700 "
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-outfit ">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Lower div */}
        <div className="w-full  h-fit flex gap-2 p-3 z-10 ">
          {/* fillter */}
          <div className="w-1/6 "></div>

          {/* Job Listting */}
          <div
            className={` ${
              activeJob ? "w-[700px]" : "w-[1000px]"
            } h-fit  p-2 overflow-y-auto`}
          >
            {/* Main Container for job card */}
            <div className={`w-fit h-full grid ${activeJob || activeChat ? "grid-cols-2" : "grid-cols-3"}  gap-4 `}>
              {allJobs?.map((job, index) => {
                return (
                  <div key={index} onClick={() => {setActiveJob(job); setActiveChat(false)}} className="flex-1 min-w-[300px] max-w-[350px] ">
                    <AllJobCard key={index} job={job}  isActive={activeJob?._id === job._id} />
                  </div>
                );
              })}
            </div>
          </div>


          {/* Job Display */}
          {activeJob && (
            <div className="relative w-[500px] h-fit  p-4 bg-white rounded-lg">
              {/* Close Job Display */}
              <div
                onClick={() => setActiveJob(null)}
                className="bg-gray-200 size-fit p-1 rounded-full absolute right-2 top-2 z-20 cursor-pointer"
              >
                <RxCross2 className="text-xs" />
              </div>

              {/* Normal Job display */}
              {!activeChat && <JobDisplay job={activeJob} setActiveChat={setActiveChat} user={authUser} />}

              {/* Chat overlapping Job Display */}
              {activeChat && (
                <div className="absolute h-[600px] inset-0 bg-white rounded-lg z-30">
                  <Chat setActiveChat={setActiveChat} userId={authUser?._id}/>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default JobListings;
