import  { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { StoreContext } from "../context/StoreContext";

const ProfileInput = () => {
  const { setProfileInput, profileInput, formData, setFormData , updateProfile , fetchFreelancer ,fetchProjects } =
    useContext(StoreContext);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1980; i < currentYear + 10; i++) {
    years.push(i);
  }

  const handleFormChange = (e, section, field, subfield = null) => {
    const value = e.target.value;

    setFormData((prev) => {
      if (subfield) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              [subfield]: value,
            },
          },
        };
      }

      if (field) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }

      return {
        ...prev,
        [section]: value,
      };
    });
  };

  return (
    <div className="overflow-hidden fixed">
      {/* Title */}
      <div className="relative flex flex-col gap-2 bg-white-100 h-fit w-[800px] p-5 rounded-2xl">
        <div className="border-b-2 border-gray-50 text-2xl font-outfit ">
          <div className="flex justify-between items-center">
            <p>{profileInput}</p>
            <div
              onClick={() => setProfileInput(false)}
              className="rounded-full p-1 items-center hover:bg-gray-200 "
            >
              <RxCross2 />
            </div>
          </div>
        </div>

        {/*Info - Input field */}
        {profileInput === "Info" && (
          <div className="flex flex-col gap-5">
            {/* Contact */}
            <div>
              <p className="text-black text-lg">Contact</p>
              <input
                type="text"
                name="contact"
                value={formData.info.contact}
                className="w-full border-2 border-gray-600 rounded-md h-8 focus:outline-none font-outfit text-gray-600"
                onChange={(e) => handleFormChange(e, "info", "contact")}
              />
            </div>

            {/* Location */}
            <div>
              <p className="text-black text-lg ">Location</p>

              <p className="text-gray-600">Country</p>
              <input
                type="text"
                name="country"
                value={formData.info.location.country}
                className="w-full border-2 border-gray-600 rounded-md h-8 focus:outline-none font-outfit text-gray-600"
                onChange={(e) => handleFormChange(e, "info", "location" , "country")}
              />

              <p className="text-gray-600">City</p>
              <input
                type="text"
                name="city"
                value={formData.info.location.city}
                className="w-full border-2 border-gray-600 rounded-md h-8 focus:outline-none font-outfit text-gray-600"
                onChange={(e) => handleFormChange(e, "info", "location" , "city")}
              />
            </div>

            {/* Github */}
            <div>
              <p className="text-black text-lg">GitHub</p>
              <input
                type="email"
                name="github"
                value={formData.info.github}
                className="w-full border-2 border-gray-600 rounded-md h-8 focus:outline-none font-outfit text-gray-600"
                onChange={(e) => handleFormChange(e, "info", "github")}
              />
            </div>
          </div>
        )}

        {/* About - input Field */}
        {profileInput === "Summary" && (
          <div>
            <div className="flex flex-col gap-3">
              <p className="text-3xl font-light font-outfit">
                Let's add your Summary
              </p>
              <p className="text-gray-50 font-outfit">
                You can write about your years of experience, industry, or
                skills. People also talk about their achievements or previous
                job experiences
              </p>
            </div>

            {/* Input TextArea */}
            <textarea
              name="summary"
              className="border-1 w-full h-80 rounded-md"
              value={formData.summary}
              onChange={(e) => handleFormChange(e, "summary")}
            ></textarea>
          </div>
        )}

        {/* Education - Input Field */}
        {profileInput === "Education" && (
          <div className="flex flex-col gap-3">
            {/* School name */}
            <div>
              <p className="text-black font-outfit text-lg">School</p>
              <input
                type="text"
                className="w-full border-1 border-gray-600 rounded-md focus:outline-none font-outfit text-gray-600 h-8"
                value={formData.education.school}
                onChange={(e) => handleFormChange(e, "education", "school")}
              />
            </div>

            {/* Degree  */}
            <div>
              <p className="text-black font-outfit text-lg">Degree</p>
              <input
                type="text"
                className="w-full border-1 border-gray-600 rounded-md focus:outline-none font-outfit text-gray-600 h-8"
                value={formData.education.degree}
                onChange={(e) => handleFormChange(e, "education", "degree")}
              />
            </div>

            {/* Field of Study*/}
            <div>
              <p className="text-black font-outfit text-lg">Field of Study</p>
              <input
                type="text"
                className="w-full border-1 border-gray-600 rounded-md focus:outline-none font-outfit text-gray-600 h-8"
                value={formData.education.field}
                onChange={(e) => handleFormChange(e, "education", "field")}
              />
            </div>

            {/* Start date */}
            <div className="">
              <p className="text-black font-outfit text-lg">Start Date</p>
              <div className="flex gap-3">
                {/* Month Dropdown */}
                <select
                  value={formData.education.startDate.month}
                  onChange={(e) =>
                    handleFormChange(e, "education", "startDate", "month")
                  }
                  className="p-2 w-full rounded-lg border-1 border-gray-600 focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Month</option>
                  {months.map((m, index) => (
                    <option key={index} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* Year dropdown */}
                <select
                  value={formData.education.startDate.year}
                  onChange={(e) =>
                    handleFormChange(e, "education", "startDate", "year")
                  }
                  className="p-2 w-full rounded-lg border-1 border-gray-600 focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Year</option>
                  {years.map((y, index) => (
                    <option key={index} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* End date */}
            <div className="">
              <p className="text-black font-outfit text-lg">End Date</p>
              <div className="flex gap-3">
                {/* Month Dropdown */}
                <select
                  value={formData.education.endDate.month}
                  onChange={(e) =>
                    handleFormChange(e, "education", "endDate", "month")
                  }
                  className="p-2 w-full rounded-lg border-1 border-gray-600 focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Month</option>
                  {months.map((m, index) => (
                    <option key={index} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* Year dropdown */}
                <select
                  value={formData.education.endDate.year}
                  onChange={(e) =>
                    handleFormChange(e, "education", "endDate", "year")
                  }
                  className="p-2 w-full rounded-lg border-1 border-gray-600 focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Year</option>
                  {years.map((y, index) => (
                    <option key={index} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Skill - input Field */}
        {profileInput === "Skills" && (
          <div>
            <div className="flex flex-col gap-3 border-b-1 border-gray-50">
              <p className="text-3xl font-light font-outfit">
                Let's add your Skills
              </p>
              <p className="text-gray-50 font-outfit">
                Think about the abilities clients would look for when hiring
                you—whether it’s web development, design, writing,
                communication, or project management
              </p>
            </div>

            {/* Input Field */}
            <div>
              <p className="text-black font-outfit text-xl">Skills</p>
              <input
                type="text"
                className="border-1 border-gray-600 focus:outline-none font-outfit w-full rounded-md h-8 text-gray-300"
                value={formData.skills}
                onChange={(e) => handleFormChange(e, "skills")}
              />
            </div>
          </div>
        )}

        {/* Project - input Field */}
        {profileInput === "Projects" && (
          <div>
            {/* Project name */}
            <div>
              <p className="text-black font-outfit text-lg">Project name</p>
              <input
                type="text"
                className="w-full border-1 border-gray-600 rounded-md focus:outline-none font-outfit text-gray-600 h-8"
                value={formData.project.proj_name}
                onChange={(e) => handleFormChange(e, "project", "proj_name")}
              />
            </div>

            {/* Project Desc */}
            <div>
              <p className="text-black font-outfit text-lg">Project Desc</p>
              <input
                type="text"
                className="w-full border-1 border-gray-600 rounded-md focus:outline-none font-outfit text-gray-600 h-8"
                value={formData.project.proj_desc}
                onChange={(e) => handleFormChange(e, "project", "proj_desc")}
              />
            </div>

            {/* Project url */}
            <div>
              <p className="text-black font-outfit text-lg">Project url</p>
              <input
                type="text"
                className="w-full border-1 border-gray-600 rounded-md focus:outline-none font-outfit text-gray-600 h-8"
                value={formData.project.proj_url}
                onChange={(e) => handleFormChange(e, "project", "proj_url")}
              />
            </div>
          </div>
        )}

        {/* Save Btn */}
        <button onClick={async() => {
            if(!formData) return;
            const res = await updateProfile(formData , profileInput)
            if (res?.success) {
              setProfileInput(false);
              fetchFreelancer();
              fetchProjects();
            }
            }} className="bg-blue-85 p-1 px-3 w-fit text-lg mt-2 text-white rounded-full self-end">
          <p>Save</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileInput;
