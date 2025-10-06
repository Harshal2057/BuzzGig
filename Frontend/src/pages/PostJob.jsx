import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import AboutTheJob from "../components/PostJob/AboutTheJob";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import FreelancerRequirement from "../components/PostJob/FreelancerRequirement";
import Budget from "../components/PostJob/Budget";
import { RxCross2 } from "react-icons/rx";
import { JobStoreContext } from "../context/JobStore";
import toast from "react-hot-toast";

const PostJob = () => {
  const { setPostJob, jobForm , jobPost } = useContext(JobStoreContext);

  const [level, setLevel] = useState(1);

  const isStepValid = () => {
    if (level === 1) {
      return (
        jobForm.title.trim() !== "" &&
        jobForm.description.trim() !== "" &&
        jobForm.mode.trim() !== "" &&
        jobForm.duration.trim() !== "" &&
        jobForm.deadline?.trim() !== ""
      );
    }

    if (level === 2) {
      return (
        jobForm.tags.trim() !== "" &&
        jobForm.experienceLevel.trim() !== "" &&
        Array.isArray(jobForm.skills) && jobForm.skills.length > 0
      );
    }

    if (level === 3) {
      return (
         jobForm.salaryType.trim() !== ""&&
         jobForm.budget.trim() !== ""
      );
    }

    return false;
  };

  return (
    <div className="relative border-2 w-4/6 bg-white border-gray-50 rounded-lg pb-20 max-h-[90vh] overflow-y-auto scrollbar-hide">
      {/* Top div */}
      <div className=" w-full flex flex-col gap-9 pb-5 border-b-1 border-gray-500 sticky top-0 z-10 bg-white-100">
        {/* heading */}
        <div className="mt-10 ml-10 flex w-11/12 justify-between ">
          <p className="font-outfit text-2xl">Post the Job</p>
          <p
            onClick={() => setPostJob(false)}
            className="text-3xl border-2 rounded-full"
          >
            <RxCross2 />
          </p>
        </div>

        {/* Job post levels */}
        <div className="flex justify-around">
          {/* About */}
          <div
            className={`border-2  rounded-full w-fit px-3 py-1 flex items-center gap-2 ${
              level === 1 ? "border-blue-85" : ""
            }`}
          >
            <div
              className={`border-2 size-5 rounded-full flex justify-center items-center ${
                level === 1 ? "border-blue-85" : ""
              }`}
            >
              <p
                className={`font-outfit text-sm ${
                  level === 1 ? "text-blue-85" : ""
                }`}
              >
                1
              </p>
            </div>
            <p
              className={`font-outfit text-lg ${
                level === 1 ? "text-blue-85" : ""
              }`}
            >
              About the job
            </p>
          </div>

          {/* Freelancer Requirement */}
          <div
            className={`border-2  rounded-full w-fit px-3 py-1 flex items-center gap-2 ${
              level === 2 ? "border-blue-85" : ""
            }`}
          >
            <div
              className={`border-2 size-5 rounded-full flex justify-center items-center ${
                level === 2 ? "border-blue-85" : ""
              }`}
            >
              <p
                className={`font-outfit text-sm ${
                  level === 2 ? "text-blue-85" : ""
                }`}
              >
                2
              </p>
            </div>
            <p
              className={`font-outfit text-lg ${
                level === 2 ? "text-blue-85" : ""
              }`}
            >
              Freelancer Requirement
            </p>
          </div>

          {/* Budget */}
          <div
            className={`border-2  rounded-full w-fit px-3 py-1 flex items-center gap-2 ${
              level === 3 ? "border-blue-85" : ""
            }`}
          >
            <div
              className={`border-2 size-5 rounded-full flex justify-center items-center ${
                level === 3 ? "border-blue-85" : ""
              }`}
            >
              <p
                className={`font-outfit text-sm ${
                  level === 3 ? "text-blue-85" : ""
                }`}
              >
                3
              </p>
            </div>
            <p
              className={`font-outfit text-lg ${
                level === 3 ? "text-blue-85" : ""
              }`}
            >
              Budget
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-y-auto mt-5 scrollbar-hide">
        {level === 1 && <AboutTheJob />}
        {level === 2 && <FreelancerRequirement />}
        {level === 3 && <Budget />}
      </div>

      {/* Footer Div */}
      <div className="w-full relative top-10  flex justify-between px-20">
        {/* back btn */}
        {level !== 1 && (
          <button
            onClick={() => setLevel((prev) => prev - 1)}
            className="border-2 border-blue-85 rounded-lg px-3 py-1 flex items-center gap-1"
          >
            <p className="text-blue-85">
              <FaArrowLeft />
            </p>
            <p className="font-outfit text-xl text-blue-85">Back</p>
          </button>
        )}

        {/* next btn */}
<button
  onClick={async () => {
    if (isStepValid()) {
      if (level === 3) {
        await jobPost(jobForm); 
        setPostJob(false);
      } else {
        setLevel((prev) => prev + 1); 
      }
    } else {
      toast.error("Please fill all the required fields!");
    }
  }}
  className="bg-blue-85 rounded-lg px-3 py-1 flex items-center gap-1"
>
  <p className="font-outfit text-xl text-white">
    {level === 3 ? "Finalize this post" : "Next"}
  </p>
  <p className="text-white">
    <FaArrowRight />
  </p>
</button>

      </div>
    </div>
  );
};

export default PostJob;
