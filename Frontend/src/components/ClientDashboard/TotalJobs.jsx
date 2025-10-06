import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { TiTick } from "react-icons/ti";
import { JobStoreContext } from "../../context/JobStore";

const TotalJobs = () => {

  const {clientJobs} = useContext(JobStoreContext)

  return (
    <div
      style={{
        backgroundColor: "#1A76FF",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
      className="h-fit w-[250px]  p-3 rounded-2xl flex flex-col gap-5"
    >

      {/* Main Container */}
      <div className="w-full h-full">
            {/* heading */}
            <div className="flex flex-col gap-4">
                <p className="font-outfit text-white text-2xl">Total Jobs</p>
                <p className="font-outfit text-white text-3xl rounded-full border-2 size-10 text-center ">{clientJobs?.length}</p>
            </div>
            <div className="underline underline-offset-2 text-gray-200">
                <p className="font-outfit text-sm text-gray-200">view all jobs</p>
            </div>
      </div>

    </div>
  );
};

export default TotalJobs;
