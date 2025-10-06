import { IoSearchOutline } from "react-icons/io5";
import Fillter from "../components/ClientJobDisplay/Fillter";
import { JobStoreContext } from "../context/JobStore";
import { useContext, useEffect } from "react";
import JobCard from "../components/ClientJobDisplay/JobCard";
import { assets } from "../assets/assets";

const ClientJobs = () => {

    const {clientJobs } = useContext(JobStoreContext);



  return (
    <div className="bg-gray-200 w-screen min-h-screen">
      <div className="h-full w-full">
        {/* Upper div */}
        <div 
                style={{
        backgroundColor: "#0A1FC2",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
        className="w-full h-60  flex flex-col items-center justify-end gap-3">

          {/* Headline */}
          <div>
            <p className="text-white font-outfit text-4xl">find all your jobs ...</p>
          </div>

          {/* Input div */}
          <div className="flex items-center w-9/12 h-14 rounded-full border-2 border-white bg-white px-1 py-1 mb-5">
            <IoSearchOutline className="text-gray-500 mr-3 ml-3 size-6" />
            <input
              type="text"
              placeholder="Enter the job title"
              className="flex-1 bg-transparent outline-none font-outfit text-gray-300"
            />
            <button className="bg-blue-85 text-white h-full w-30  text-md font-outfit rounded-full hover:bg-blue-600">
                Search
            </button>
          </div>
        </div>

        {/* Lower div */}
        <div className="w-full h-full border-4 border-red-600 flex  p-3 gap-3">
                {/* Filter div */}
                <div className="w-1/6 border-2 border-green-500">
                    <Fillter />
                </div>

                {/* job display */}
                <div className="w-5/6  flex flex-col gap-5">
                    {
                        clientJobs?.map((job , index) => {
                            return(
                                <JobCard key={index} title={job.title} descriptions={job.description} budget={job.budget} bids={job.bids} />
                            )
                        })
                    }
                </div>
        </div>
      </div>
    </div>
  );
};

export default ClientJobs;
