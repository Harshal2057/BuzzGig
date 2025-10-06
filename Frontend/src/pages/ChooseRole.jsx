import React, { useContext, useReducer, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { StoreContext } from "../context/StoreContext";
import Loader from "../utils/Loader";

const ChooseRole = () => {
  const { user , updateUserRole , isLoading , setIsLoading } = useContext(StoreContext);

  // useEffect(() => {
  //   console.log("User in ChooseRole:", user);
  // }, [user]);

  const leftScreenRef = useRef(null);
  const rightScreenRef = useRef(null);
  const chooseRef = useRef(null);
  const RecButtonRef = useRef(null);
  const FreelacerButtonRef = useRef(null);
  const ClientImgRef = useRef(null);
  const FreelancerRef = useRef(null);
  const ClientTextRef = useRef(null); // Add ref for client text
  const FreelancerTextRef = useRef(null); // Add ref for freelancer text

  useGSAP(() => {
    gsap.set(leftScreenRef.current, { x: "-100%" });
    gsap.set(rightScreenRef.current, { x: "100%" });
  });

  const handleLeftScreen = (e) => {
    e.stopPropagation(); // prevent outer click

    // Create a timeline for synchronized animations
    const tl = gsap.timeline();

    tl.to(leftScreenRef.current, {
      x: "0%",
      duration: 0.8,
      ease: "power3.inOut",
    })
      .to(
        chooseRef.current,
        {
          scale: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        FreelacerButtonRef.current,
        {
          y: "50%",
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        FreelancerRef.current,
        {
          scale: 1.3,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        FreelancerTextRef.current,
        {
          y: "-110%",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      );
  };

  const handleRightScreen = (e) => {
    e.stopPropagation(); // prevent outer click

    // Create a timeline for synchronized animations
    const tl = gsap.timeline();

    tl.to(rightScreenRef.current, {
      x: "0%",
      duration: 0.8,
      ease: "power3.inOut",
    })
      .to(
        chooseRef.current,
        {
          scale: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        RecButtonRef.current,
        {
          y: "50%",
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        ClientImgRef.current,
        {
          scale: 1.3,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        ClientTextRef.current,
        {
          y: "-110%",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      );
  };

  const resetScreens = () => {
    const tl = gsap.timeline();

    tl.to([leftScreenRef.current, rightScreenRef.current], {
      x: (index) => (index === 0 ? "-100%" : "100%"),
      duration: 0.9,
      ease: "power3.inOut",
    })
      .to(
        chooseRef.current,
        {
          scale: 1,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        [RecButtonRef.current, FreelacerButtonRef.current],
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        [ClientImgRef.current, FreelancerRef.current],
        {
          scale: 1,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        [ClientTextRef.current, FreelancerTextRef.current],
        {
          y: "0%",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      );
  };



  return (
    <div
      className="relative min-h-screen w-screen overflow-hidden flex"
      onClick={resetScreens} // clicking anywhere triggers reset
    >
      {/* left White Screen */}
      <div
        ref={leftScreenRef}
        className="absolute  p-15 z-30 w-1/2 h-full bg-white flex justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Prevent reset when clicking on this screen
      >
        <div className="flex flex-col gap-8">
          {/* LOGO */}
          <div className="flex gap-2">
            <div className=" w-fit bg-blue-100 rounded-lg p-1">
              <img
                src={assets.BuzzGig_Logo}
                alt="BuzzgigLogo"
                className="size-10"
              />
            </div>
            <p className="relative top-1 right-1 font-racing-sans-one text-4xl ">
              BuzzGig
            </p>
          </div>

          {/* help */}
          <div className="w-5/6">
            <p className="text-2xl font-outfit font-semibold">
              Welcome here ! Let me help you in Signing up .
            </p>
          </div>

          {/* name and email */}
          <div className="">
            {/* name */}
            <div className="border-b-1 border-black w-4/6 p-1 ">
              <p className="text-xl text-gray-50">{user?.name}</p>
            </div>

            {/* email */}
            <div className="border-b-1 border-black w-4/6 p-1 ">
              <p className="text-xl text-gray-50">{user?.email}</p>
            </div>
          </div>

          {/* button */}
          <div 
          onClick={() => updateUserRole("freelancer")}
          className="bg-blue-85 rounded-xl w-fit p-2 font-outfit text-white text-2xl hover:bg-white hover:shadow-[inset_0_0_0_4px_rgb(26,118,255)] hover:text-blue-85 hover:scale-90 transition-all duration-150 ease-in-out">
            <p>Continue</p>
          </div>
        </div>
      </div>

      {/* Left div */}
      <div className="w-1/2 bg-blue-85 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center ">
          <p
            ref={ClientTextRef}
            className="font-outfit font-semibold text-3xl text-white"
          >
            I'm here for Hiring
          </p>
          <img
            ref={ClientImgRef}
            src={assets.ClientRole}
            className="h-[350px]"
          />
          <div
            ref={RecButtonRef}
            onClick={(e) => {
              handleRightScreen(e);
            }}
            
            className="py-3 px-6 w-full bg-white text-center font-outfit font-semibold rounded-full text-blue-85 hover:bg-blue-85 hover:shadow-[inset_0_0_0_4px_rgb(255,255,255)] hover:text-white cursor-pointer"
          >
            <p>SIGN UP AS RECRUITER</p>
          </div>
        </div>
      </div>

      {/* Right div */}
      <div className="w-1/2 bg-blue-75 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center  ">
          <p
            ref={FreelancerTextRef}
            className="font-outfit font-semibold text-3xl text-white"
          >
            I'm here for Job Seeking
          </p>
          <img
            ref={FreelancerRef}
            src={assets.FreelancersRole}
            className="h-[350px]"
          />
          <div
            ref={FreelacerButtonRef}
            onClick={(e) => {
              handleLeftScreen(e);
            }}
            className="py-3 px-6 w-full bg-white text-center font-outfit font-semibold rounded-full text-blue-85 hover:bg-blue-75 hover:shadow-[inset_0_0_0_4px_rgb(255,255,255)] hover:text-white cursor-pointer"
          >
            <p>SIGN UP AS FREELANCER</p>
          </div>
        </div>
      </div>

      {/* Right White Screen */}
      <div
        ref={rightScreenRef}
        className="absolute left-[50%] p-15 z-30 w-1/2 h-full bg-white flex justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Prevent reset when clicking on this screen
      >
        <div className="flex flex-col gap-8">
          {/* LOGO */}
          <div className="flex gap-2">
            <div className=" w-fit bg-blue-100 rounded-lg p-1">
              <img
                src={assets.BuzzGig_Logo}
                alt="BuzzgigLogo"
                className="size-10"
              />
            </div>
            <p className="relative top-1 right-1 font-racing-sans-one text-4xl ">
              BuzzGig
            </p>
          </div>

          {/* help */}
          <div className="w-5/6">
            <p className="text-2xl font-outfit font-semibold">
              Welcome here ! Let me help you in Signing up .
            </p>
          </div>

          {/* name and email */}
          <div className="">
            {/* name */}
            <div className="border-b-1 border-black w-4/6 p-1 ">
              <p className="text-xl text-gray-50">{user?.name}</p>
            </div>

            {/* email */}
            <div className="border-b-1 border-black w-4/6 p-1 ">
              <p className="text-xl text-gray-50">{user?.email}</p>
            </div>
          </div>

          {/* Phone Verification */}

          {/* button */}
          <div
          onClick={() => updateUserRole("client")}
          className="bg-blue-85 rounded-xl w-fit p-2 font-outfit text-white text-2xl hover:bg-white hover:shadow-[inset_0_0_0_4px_rgb(26,118,255)] hover:text-blue-85 hover:scale-90 transition-all duration-150 ease-in-out">
            <p>Continue</p>
          </div>
        </div>
      </div>

      {/* Choose Role */}
      <div
        ref={chooseRef}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   rounded-2xl size-40 flex justify-center items-center bg-amber-50 shadow-xl"
      >
        <p className="font-racing-sans-one text-xl text-blue-85">CHOOSE ROLE</p>
      </div>


        {isLoading && <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-xs bg-black/30">
          <Loader />
        </div>}
    </div>
  );
};

export default ChooseRole;
