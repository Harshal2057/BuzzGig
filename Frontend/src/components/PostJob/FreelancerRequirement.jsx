import React, { useContext, useState , useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { JobStoreContext } from "../../context/JobStore";


const FreelancerRequirement = () => {
  const { jobForm, setJobForm } = useContext(JobStoreContext);

  // const[skills ,setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState({
    category: false,
  });

  const jobCategory = [
    "software development",
    "data science",
    "marketing",
    "design",
    "finance",
    "healthcare",
    "education",
    "customer service",
    "sales",
    "engineering",
    "manufacturing",
    "construction",
    "real estate",
    "human resources",
    "legal",
    "hospitality",
    "tourism",
    "media",
    "entertainment",
    "transportation",
    "logistics",
    "retail",
    "agriculture",
    "government",
    "non-profit",
    "research",
    "public relations",
  ];

  const handleKeyDown = (e) => {
    if (e.key == "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!jobForm.skills.includes(inputValue.trim())) {
        setJobForm((prev) => ({
          ...prev,
          skills: [...prev.skills, inputValue.trim()],
        }));
      }
      setInputValue("");
    }
  };

  const removeSkill = (index) => {
    setJobForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

    useEffect(() => {
          console.log(jobForm);
          
    },[jobForm])

  return (
    <div className="w-full mt-5 flex justify-center items-center ">
      {/* Main Container */}
      <div className="relative w-5/6 ">
        {/* Dropdowns */}
        <div>
          {/* Trigger div */}
          <div
            onClick={() =>
              setOpen((prev) => ({ ...prev, category: !prev.category }))
            }
            className="border-2 border-gray-600 w-fit p-1 rounded-lg flex items-center gap-4"
          >
            <p className="font-outfit text-lg">
              {jobForm.tags || "Job Category"}
            </p>
            <div>
              <IoIosArrowDown />
            </div>
          </div>

          {/* Dropdown div */}
          {open.category && (
            <div className="border w-fit grid grid-cols-2 md:grid-cols-3 gap-3 p-2 rounded-lg">
              {jobCategory.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setJobForm((prev) => ({ ...prev, tags: item }));
                      setOpen((prev) => ({ ...prev, category: false }));
                    }}
                    key={index}
                    className="hover:bg-gray-200  rounded-lg"
                  >
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Skills needed */}
        <div>
          <p className="text-gray-600 text-lg font-outfit">Skills needed</p>

          <div className="border-2 rounded-lg p-2 flex flex-wrap gap-2">
            {jobForm.skills.map((skill, index) => {
              return (
                <span
                  key={index}
                  className="bg-blue-200 text-white font-outfit px-2 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-white font-bold"
                  >
                    ✕
                  </button>
                </span>
              );
            })}

            <input
              type="text"
              name="skills"
              placeholder=""
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[120px] border-none focus:outline-none font-outfit"
            />
          </div>
        </div>

        {/* Experience level */}
        <div>
          <div>
            <p className="font-outfit text-gray-600">Experience level</p>
          </div>

          <div className="flex w-full border gap-4">
            {/* Entry */}
            <label className="border-2 w-4/12 p-3 rounded-lg flex flex-col gap-3 cursor-pointer">
              <div className="flex w-full justify-between">
                <p>Entry</p>
                <input
                  type="radio"
                  name="experience"
                  value="entry"
                  checked={jobForm.experienceLevel === "entry"}
                  onChange={(e) =>
                    setJobForm((prev) => ({
                      ...prev,
                      experienceLevel: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Slightly experienced</p>
              </div>
            </label>

            {/* Intermediate */}
            <label className="border-2 w-4/12 p-3 rounded-lg flex flex-col gap-3 cursor-pointer">
              <div className="flex w-full justify-between">
                <p>Intermediate</p>
                <input
                  type="radio"
                  name="experience"
                  value="intermediate"
                  checked={jobForm.experienceLevel === "intermediate"}
                  onChange={(e) =>
                    setJobForm((prev) => ({
                      ...prev,
                      experienceLevel: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Moderately experienced</p>
              </div>
            </label>

            {/* Professional */}
            <label className="border-2 w-4/12 p-3 rounded-lg flex flex-col gap-3 cursor-pointer">
              <div className="flex w-full justify-between">
                <p>Professional</p>
                <input
                  type="radio"
                  name="experience"
                  value="professional"
                  checked={jobForm.experienceLevel === "professional"}
                  onChange={(e) =>
                    setJobForm((prev) => ({
                      ...prev,
                      experienceLevel: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Highly experienced</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRequirement;
