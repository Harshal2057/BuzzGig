import React, { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { JobStoreContext } from "../../context/JobStore";
import { useContext } from "react";
import { useEffect } from "react";


const AboutTheJob = () => {

    const {jobForm , setJobForm } = useContext(JobStoreContext)

  const [open, setOpen] = useState({
    type: false,
    duration: false,
  });

  const handleFormChange = (e) => {
        const {value , name} = e.target;

        setJobForm((prev) => ({
            ...prev,
            [name]:value
        }))

  }



  const jobOpt = ["Remote", "On-Site"];
  const durationOpt = [
    "Less than 1 month",
    "1 to 3 months",
    "3 to 6 months",
    "More than 6 months",
  ];

  return (
    <div className="w-full mt-5 flex justify-center items-center">
      {/* Main Container */}
      <div className=" w-5/6  relative">
        {/* form */}
        <form className="flex flex-col gap-7 relative border-b-1 pb-7" action="">
                    {/* Title */}
                    <div>
                        <p className="font-outfit text-lg text-gray-600">Title</p>
                        <input
                        onChange={handleFormChange}
                        type="text"
                        name="title"
                        value={jobForm.title}
                        placeholder=""
                        className="w-full border-1 focus:outline-none rounded-lg h-9 font-outfit text-gray-600 px-3"
                        />
                    </div>

                    {/* Summary */}
                    <div>
                        <p className="font-outfit text-lg text-gray-600">Description</p>
                        <input
                        type="text"
                        name="description"
                        value={jobForm.description}
                        placeholder=""
                        className="w-full border-1 focus:outline-none rounded-lg h-19 font-outfit text-gray-600 px-3"
                        onChange={handleFormChange}
                        />
                    </div>

                    {/* Deliverables */}
                    {/* <div>
                        <p className="font-outfit text-lg text-gray-600">Deliverables</p>
                        <input
                        type="text"
                        name="title"
                        placeholder=""
                        className="w-full border-1 focus:outline-none rounded-lg h-19 font-outfit text-gray-600 px-3"
                        />
                    </div> */}

                        {/* Attach supporting files */}
                    <div className=" flex gap-3 border-2 w-fit p-1 px-2 rounded-lg border-blue-85">
                        <p className="text-3xl text-blue-85">
                        <MdAttachFile />
                        </p>
                        <p className="text-lg text-blue-85">Add supporting files</p>
                    </div>

                    {/* Dropdowns */}
                    <div className="relative flex gap-16">
                            {/* Jobtype dropdown */}
                            <div>
                            {/* Trigger div */}
                            <div
                                onClick={() =>
                                setOpen((prev) => ({ ...prev, type: !prev.type }))
                                }
                                className="border-1 w-fit border-gray600 p-1 flex items-center gap-5 rounded-lg mb-1"
                            >
                                <p className="font-outfit text-md  text-gray-600">{jobForm.mode || "Job Type"}</p>
                                <p className="">
                                <IoIosArrowDown />
                                </p>
                            </div>

                            {/* Dropdown div */}
                            {open.type && (
                                <div 
                                className="absolute  flex flex-col gap-2 border-1 w-[110px] p-1 rounded-lg">
                                {jobOpt.map((type, index) => {
                                    return (
                                    <div key={index} className="border-b-1 border-gray-50"
                                        onClick={() => {
                                            setJobForm((prev) => ({...prev , mode : type}))
                                            setOpen((prev) => ({ ...prev, type: false })); 
                                        }}
                                    >
                                        <p className="text-gray-600">{type}</p>
                                    </div>
                                    );
                                })}
                                </div>
                            )}
                            </div>

                            {/* Duration dropdown */}
                            <div>
                            {/* Trigger div */}
                            <div
                                onClick={() =>
                                setOpen((prev) => ({ ...prev, duration: !prev.duration }))
                                }
                                className="border-1 w-fit border-gray600 p-1 flex items-center gap-5 rounded-lg mb-1"
                            >
                                <p className="font-outfit text-md  text-gray-600">{jobForm.duration || "Duration"}</p>
                                <p className="">
                                <IoIosArrowDown />
                                </p>
                            </div>

                            {/* Dropdown div */}
                            {open.duration && (
                                <div className="absolute flex flex-col gap-2 border-1 w-[110px] p-1 rounded-lg">
                                {durationOpt.map((type, index) => {
                                    return (
                                    <div key={index} className="border-b-1 border-gray-50"
                                        onClick={() => {
                                            setJobForm((prev) => ({...prev , duration:type}));
                                            setOpen((prev) => ({...prev , duration : !prev.duration}))
                                        }}
                                    >
                                        <p className="text-gray-600">{type}</p>
                                    </div>
                                    );
                                })}
                                </div>
                            )}
                            </div>
                    </div>

                    {/* Deadline */}
                    <div>
                        <p className="font-outfit text-lg mt-10 text-gray-600">Deadline</p>
                        <input type="date" name="deadline" value={jobForm.deadline}  className="font-outfit border-2 rounded-lg p-1"
                            onChange={handleFormChange}
                        />
                    </div>
        </form>
      </div>
    </div>
  );
};

export default AboutTheJob;
