import { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCircleDot,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({
  MainText,
  SubText,
  btn,
  icon,
  inputType,
  skills,
  education,
  projects,
}) => {
  const { setProfileInput } = useContext(StoreContext);

  // useEffect(() => {
  //   console.log("Projects =>", projects); // don't wrap in template literal
  // }, [projects]);

  return (
    <div className="overflow-hidden">
      {/* Main Container */}
      <div className="relative bg-white-100 h-fit w-[800px] p-5 rounded-2xl">
        <div className="border-dashed border-2 p-4 border-gray-50 rounded-2xl  flex flex-col gap-2">
          {/* Main text */}
          <div className="flex gap-2 items-center">
            <img src={icon} className="size-10" />
            <p className="font-semibold text-xl font-outfit">{MainText}</p>
          </div>
          {/* Sub text */}
          <p className="text-gray-300">{SubText}</p>

          {/* skills education projects array  */}
          {skills && (
            <div className="flex flex-col gap-2">
              {skills.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-3 items-center border-b-2 border-gray-50"
                  >
                    <FontAwesomeIcon icon={faCircleDot} />
                    <p className="font-outfit text-lg ">{skill}</p>
                  </div>
                );
              })}
            </div>
          )}

          {education && (
            <div>
              {education.map((edu, index) => {
                return (
                  <div key={index}>
                    {/* School  */}
                    <div className="flex gap-3 items-center text-2xl">
                      <FontAwesomeIcon icon={faGraduationCap} />
                      <p className="font-outfit font-semibold text-xl">
                        {edu.school}
                      </p>
                    </div>
                    <p className="text-gray-600 font-outfit ml-10">{`${edu.degree} - ${edu.field}`}</p>
                    <p className="text-gray-600 font-outfit ml-10">{`${edu.startDate.month} ${edu.startDate.year} - ${edu.endDate.month} ${edu.endDate.year}`}</p>
                  </div>
                );
              })}
            </div>
          )}

          {Array.isArray(projects) && projects.length > 0 && (
            <div>
              {projects &&
                projects.map((proj, index) => {
                  return (
                    <div key={index} className="">
                      <div className="flex gap-2 items-center">
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="text-2xl"
                        />
                        <p className="font-outfit font-semibold text-xl">
                          {proj.proj_name}
                        </p>
                      </div>
                      <p className="text-gray-600 font-outfit ml-10">
                        {proj.proj_desc}
                      </p>
                      <a
                        href={
                          proj.proj_url.startsWith("http")
                            ? proj.proj_url
                            : `https://${proj.proj_url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600  font-outfit ml-10"
                      >
                        {proj.proj_url}
                      </a>
                    </div>
                  );
                })}
            </div>
          )}

          {/* ///////////////////////////////////////// */}

          <div
            onClick={() => setProfileInput(inputType)}
            className="border-2 border-gray-100 w-fit p-1 px-3 mt-4 rounded-full hover:bg-black hover:text-white"
          >
            {btn}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
