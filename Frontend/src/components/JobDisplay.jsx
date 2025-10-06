import React, { useContext, useEffect } from "react";
import { HiStar } from "react-icons/hi2";
import { MdPeopleAlt } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { formatDistanceToNow } from "date-fns";
import { SocketContext } from "../context/SocketContext";

const JobDisplay = ({ job , setActiveChat , user }) => {

    const {setSelectedUserId , selectedUserId} = useContext(SocketContext)

    // useEffect(() => {
    //   console.log("seleceted user id =>" , selectedUserId);   
    //   console.log("in job user id =>" , job?.postedBy?._id);   
    // },[selectedUserId])

  return (
    <div className="w-full h-full p-10">
      {/* Main Container */}
      <div>
        {/* Header */}
        <div className="border-b-1 border-gray-300 pb-2">
          {/* Title */}
          <div>
            <p className="font-outfit text-3xl font-semibold">{job?.title}</p>
          </div>

          {/* Tags  color optimization needed */}
          <div className="mt-3 flex gap-3">
            {job?.tags.map((tag, index) => {
              return (
                <div key={index} className="bg-violet-200 px-2 py-1 w-fit rounded-md">
                  <p className="text-violet-950">{tag}</p>
                </div>
              );
            })}
          </div>

          {/* Applicants */}
          <div className="flex justify-between items-center mt-5 ">
                <div className="flex gap-1 items-center mt-5 font-outfit text-sm text-gray-300 hover:text-blue-85 hover:underline hover:cursor-pointer">
                <MdPeopleAlt />
                <p>{job?.bids.length} Applicants</p>
                </div>

                <div className="flex gap-1 relative top-2">
                <FiClock className="text-gray-50 size-5" />
                <p className='text-gray-50 text-sm font-outfit'> Posted {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}</p>
                </div>
          </div>
        </div>

        {/* Mid Container */}
        <div className="flex justify-between w-5/6 mt-5">
          <div className="flex flex-col">
            <p className="font-outfit font-semibold text-xs">Budget</p>
            <p className="font-outfit text-gray-300 text-sm relative bottom-1">
              {job?.budget}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-outfit font-semibold text-xs">Work style</p>
            <p className="font-outfit text-gray-300 text-sm relative bottom-1">
               {job?.mode}
            </p>
          </div>

            {/* Need to add some dynamic field  */}
          <div className="flex flex-col"> 
            <p className="font-outfit font-semibold text-xs">Salary type</p>
            <p className="font-outfit text-gray-300 text-sm relative bottom-1">
                400
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <p className="font-outfit text-gray-300">
                {job?.description}
          </p>
        </div>

        {/* Skills required */}
        <div className="mt-5">
          <p className="font-outfit text-xl font-medium">Skills required</p>

          {
            job?.skills.map((skill , index) => {
                return(
                    <p key={index} className="flex items-center gap-2">
                    {" "}
                    <span>
                        <HiStar className="text-xs" />
                    </span>{" "}
                    {skill}
                    </p>
                )
            })
          }
        </div>

        {/* Experience level */}
        <div className="flex flex-col gap-1 mt-5">
          <div className="flex ">
            <p className="font-outfit font-semibold text-gray-300 text-sm">
              Experience :
            </p>
            <p className="font-outfit text-gray-300 text-sm">{job?.experienceLevel}</p>
          </div>

          <div className="flex ">
            <p className="font-outfit font-semibold text-gray-300 text-sm">
              Deadline :
            </p>
            <p className="font-outfit text-gray-300 text-sm">{job?.deadline}</p>
          </div>
        </div>

        {/* Posted by */}
        <div className="flex items-center gap-1 mt-5">
          <p className="font-outfit text-gray-300 font-semibold">
            Posted By :{" "}
          </p>
          <p className="font-outfit text-gray-300 text-sm hover:text-blue-85 hover:underline cursor-pointer">
           {job?.postedBy?.fullName}
          </p>
        </div>

        {/* Apply btn */}

        <div className="flex w-full justify-between mt-8 ">
          <button className="bg-blue-85 w-2/6 px-3 py-1 rounded-md hover:bg-blue-700">
            <p className="font-outfit text-white">Apply</p>
          </button>


          {/* Contact btn */}
          <button
            onClick={() => {
                            setSelectedUserId(job?.postedBy) //client._id
                            setActiveChat(true)}}
          className="border-2 border-blue-85 text-blue-85 w-2/6 px-3 py-1 rounded-md hover:bg-blue-85 hover:text-white">
            <p className="font-outfit ">Contact</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDisplay;
