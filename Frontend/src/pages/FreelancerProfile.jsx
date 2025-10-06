import { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import ProfileCard from "../components/ProfileCard";
import ProfileHeader from "../components/ProfileHeader";
import { StoreContext } from "../context/StoreContext.jsx";
import FileUploader from "../components/FileUploader.jsx";
import ProfilePicUploader from "../components/ProfilePicUploader.jsx";
import Loader from "../utils/Loader.jsx";
import ProfileInput from "../components/ProfileInput.jsx";

const FreelancerProfile = () => {
  const {
    updateBackGroundPic,
    updateProfilePic,
    isLoading,
    fetchFreelancer,
    checkSession,
    profileInput,
    freelancerProfile,
  } = useContext(StoreContext);

  useEffect(() => {
    fetchFreelancer();
    checkSession();
  }, []);

  useEffect(() => {
    if (freelancerProfile) {
      console.log("Freelancer profile =>", freelancerProfile);
    }
  }, [freelancerProfile]);

  return (
    <div className="min-h-screen w-screen flex flex-col gap-5 overflow-hidden justify-center items-center bg-gray-200 relative">
      {/* Main Container */}
      <div className="w-full h-full">
        {/* Upper Container */}
        <div
          style={{
            backgroundColor: "#0A1FC2",
            backgroundImage: `url(${assets.eggShellBg})`,
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          }}
          className="w-full h-65 flex flex-col gap-3 justify-end items-center sticky top-0"
        ></div>

        {/* Lower Container */}
        <div className="relative bottom-20">
          {/* Blur only the profile content */}
          <div
            className={`flex flex-col gap-5 justify-center items-center  ${
              updateBackGroundPic || updateProfilePic || profileInput
                ? "opacity-30"
                : ""
            }`}
          >
            <ProfileHeader />
            <ProfileCard
              MainText={
                "Write a summary to highlight your personality or work experience"
              }
              SubText={
                freelancerProfile?.about ||
                "Write about your personality, your strengths, and your journey. Are you detail-oriented? A creative thinker? A problem solver? Let clients see your human side"
              }
              icon={assets.SummaryImg}
              btn={"Add Summary"}
              inputType={"Summary"}
            />
            <ProfileCard
              MainText={
                "Showcase your talent! Add your skills so clients can discover what you’re best at."
              }
              SubText={
                freelancerProfile?.skills
                  ? ""
                  : "Your skills are the key to unlocking new opportunities. Clients are constantly searching for freelancers who match their project needs. By adding your skills, you make it easier for them to find you, trust your expertise, and hire you. Don’t miss out—showcase what you’re great at and let your profile shine"
              }
              icon={assets.TargetImg}
              btn={"Add Skills"}
              inputType={"Skills"}
              skills={freelancerProfile?.skills || ""}
            />
            <ProfileCard
              MainText={
                "Showcase your education to highlight your expertise and stand out to potential clients."
              }
              SubText={
                freelancerProfile?.education
                  ? ""
                  : "Your educational background is an important part of your professional identity. By sharing your degrees, certifications, and courses, you help clients understand your foundation of knowledge and trust your skills even more"
              }
              icon={assets.Books}
              btn={"Add Education"}
              inputType={"Education"}
              education={freelancerProfile?.education || ""}
            />
            <ProfileCard
              MainText={
                "Your projects tell your story. Start sharing them now!"
              }
              SubText={
                freelancerProfile?.projects
                  ? ""
                  : "Don’t let your hard work stay hidden — add your projects and let clients see the real impact of your skills. A strong portfolio speaks louder than words and helps you shine among other freelancers."
              }
              icon={assets.ProjectIcon}
              btn={"Add Projects"}
              inputType={"Projects"}
              projects={freelancerProfile?.projects || ""}
            />
          </div>

          {/* Popup */}
          {updateBackGroundPic && (
            <div className="absolute z-50 top-40 left-[30%]">
              <FileUploader />
            </div>
          )}

          {updateProfilePic && (
            <div className="absolute z-50 top-40 left-[30%]">
              <ProfilePicUploader />
            </div>
          )}

          {profileInput && (
            <div className="absolute z-50 top-40 left-[24%]">
              <ProfileInput />
            </div>
          )}

          {isLoading && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-xs bg-black/30">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
