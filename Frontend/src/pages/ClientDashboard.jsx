import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import SidebarClient from "../components/ClientDashboard/SidebarClient";
import TopbarClient from "../components/ClientDashboard/TopbarClient";
import TotalJobs from "../components/ClientDashboard/TotalJobs";
import CompletedJobs from "../components/ClientDashboard/CompletedJobs";
import PendingJobs from "../components/ClientDashboard/PendingJobs";
import ChatClient from "../components/ClientDashboard/ChatClient";
import ChartDisplayClient from "../components/ClientDashboard/ChartDisplayClient";
import PostJob from "./PostJob";
import { JobStoreContext } from "../context/JobStore";

const ClientDashboard = () => {

    const {postJob , fetchClientProfile , client , clientJobs} = useContext(JobStoreContext);

    useEffect(() => {
      fetchClientProfile();
    },[])



  return (
    <div
      className="relative  h-screen w-screen overflow-hidden flex justify-center items-center"
      style={{
        backgroundColor: "#E6E6FA",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      {/* Main Container */}
      <div className={`w-full h-full flex p-2 gap-2 ${postJob ? "blur-xs" : ""}`}>
        {/* Sidebar */}
        <div className="w-1/6 h-full rounded-2xl ">
          <SidebarClient />
        </div>
        {/* Right div */}
        <div className="w-5/6 h-full rounded-2xl  ">
          <TopbarClient />
          <div className="relative  w-full">


            <div className=" w-full mt-3 px-5 flex gap-5">
              <TotalJobs />
              <CompletedJobs />
              <PendingJobs />
              <ChatClient />
            </div>

            <div
              style={{
                backgroundColor: "#F8F8FF", 
                backgroundImage: `url(${assets.eggShellBg})`,
              }}
              className="absolute w-8/12 h-full top-40 rounded-xl left-1.5  flex items-end"
            >
              <ChartDisplayClient />
            </div>
          </div>
        </div>
      </div>

       {/* Post Job */}
       <div className={`absolute w-full h-screen flex justify-center items-center ${postJob ? "" : "hidden"}`}>
              <PostJob />
       </div>
    </div>
  );
};

export default ClientDashboard;
