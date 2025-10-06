import React from "react";
import { assets } from "../../assets/assets";
import { FaArrowRight } from "react-icons/fa";
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { useEffect } from 'react';


const ProjectStatus = () => {

  const {freelancerProfile , profileUser} = useContext(StoreContext)
  

  return (
    <div
      style={{
        backgroundColor: "#F8F8FF",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow:" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }}
      className="h-fit w-[250px] bg- p-3 rounded-2xl flex flex-col gap-5"
    >
      <div className="font-outfit ">
        <p className="text-xl font-semibold">Project Status</p>
        <div className="flex items-center gap-2 text-xs">
        <p className="underline underline-offset-2  font-outfit">all projects</p>
        <FaArrowRight />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 w-full ">
          <div
            className="bg-white p-1 rounded-xl w-3/6"
            style={{boxShadow:" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
          >
            <p className="text-md font-outfit">Completed</p>
            <p className="font-outfit text-blue-85 text-2xl">{freelancerProfile?.completedJobs || "0"}</p>
          </div>

          <div className="bg-white p-1 rounded-xl w-3/6"
           style={{boxShadow:" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
          >
            <p className="text-md font-outfit ">Remaining</p>
            <p className="font-outfit text-orange-500 text-2xl">{freelancerProfile?.pendingJobs || "0"}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-1"
         style={{boxShadow:" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
        >
          <p className="text-md font-outfit ">Assigned</p>
          <p className="font-outfit text-orange-500 text-2xl">{freelancerProfile?.assignedJobs || "0"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;

