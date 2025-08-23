import { assets } from "../assets/assets.js";
import CountUp from "../utils/CountUp.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { TrustedUsers } from "../components/lightswind/TrustedUsers.jsx";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const [startOne, setStartOne] = useState(false);
  const [startTwo, setStartTwo] = useState(false);
  const [startThree, setStartThree] = useState(false);

  const [playTrusted, setPlayTrusted] = useState(false);

  const girlRef = useRef(null);
  const textOneRef = useRef(null);
  const textTwoRef = useRef(null);

  const countRef = useRef(null);
  const countOne = useRef(null);
  const countTwo = useRef(null);
  const countThree = useRef(null);

  const rotateRef = useRef(null);

  const trustRef = useRef(null)

  const skills = [
    "Web Development",
    "UI/UX Design",
    "SEO Optimization",
    "Content Writing",
    "Graphic Design",
    "Video Editing",
  ];

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.from(
      girlRef.current,
      {
        x: "100%",
        duration: 3,
        ease: "expo.out",
      },
      "group1"
    )
      .from(
        textOneRef.current,
        {
          x: "-100%",
          duration: 3,
          ease: "expo.out",
        },
        "group1"
      )
      .from(
        textTwoRef.current,
        {
          x: "-100%",
          duration: 3,
          ease: "expo.out",
        },
        "group1"
      );

    t1.from(
      countOne.current,
      {
        opacity: 0,
        x: "-75%",
        ease: "power4.out",
        onStart: () => setStartOne(true),
      },
      "group1+=1"
    );

    t1.from(
      countTwo.current,
      {
        opacity: 0,
        x: "-75%",
        ease: "power4.out",
        onStart: () => setStartTwo(true),
      },
      "group1+=2"
    );

    t1.from(
      countThree.current,
      {
        opacity: 0,
        x: "-75%",
        ease: "power4.out",
        onStart: () => setStartThree(true),
      },
      "group1+=3"
    );

    // Set transform origin explicitly for the rotating element
    gsap.set(rotateRef.current, { transformOrigin: "50% 50%" });

    // Use .to for continuous rotation without resetting
    t1.from(
      rotateRef.current,
      {
        x: "25%",
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      },
      "rotation"
    );
    t1.to(
      rotateRef.current,
      {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "linear",
      },
      "rotation-=1"
    );

    t1.from(trustRef.current , {
      y:"-25%",
      opacity:0,
      duration:2,
      onStart: () => setPlayTrusted(true)
    },
    "rotation+=1"
  )
  });

  return (
    <div
      className="h-dvh w-screen overflow-hidden "
      style={{
        backgroundColor: "#0a1fc2",
        backgroundImage: `url(${assets.HeroBackgroundTwo})`,
      }}
    >

      {/* Trusted User */}
      <div ref={trustRef} className="relative text-blue-75 left-[68%] top-[65%] w-fit  flex flex-col gap-1 justify-center items-center">
        <TrustedUsers
          avatars={[assets.ava_1, assets.ava_2, assets.ava_3, assets.ava_4]}
          rating={5}
          totalUsersText={5000}
          caption="Loved by"
          starColorClass="text-yellow-100"
          ringColors={[
            "ring-pink-500",
            "ring-green-500",
            "ring-blue-500",
            "ring-purple-500",
          ]}
                    play={playTrusted}       // ✅ controlled from Hero
          setPlay={setPlayTrusted}
        />
        <div className="font-anton w-3/6 text-white border-t-4 border-yellow-100 pt-2">
          <p>Freelancers and clients connect seamlessly on our platform with trust and reliability.</p>
        </div>
      </div>

      {/* Count up */}
      <div
        ref={countRef}
        className="hidden  sm:absolute top-[7%] left-[5%] sm:flex flex-col gap-12"
      >
        {/* Happy Client */}
        <div ref={countOne} className="border-b-4 border-yellow-100">
          <div className="flex gap-2">
            <CountUp
              value={500}
              duration={3}
              animation="easeOutExpo"
              color="#F5F5DC"
              className="text-5xl font-bold font-racing-sans-one"
              start={startOne}
            />
            <p className="font-extrabold text-3xl font-racing-sans-one text-yellow-100">
              +
            </p>
          </div>
          <p className="font-racing-sans-one text-blue-75 text-2xl">
            Happy Client
          </p>
        </div>

        {/* Project completed */}
        <div ref={countTwo} className="border-b-4 border-yellow-100">
          <div className="flex gap-2">
            <CountUp
              value={300}
              duration={3}
              animation="easeOutExpo"
              color="#F5F5DC"
              className="text-5xl font-bold font-racing-sans-one"
              start={startTwo}
            />
            <p className="font-extrabold text-3xl font-racing-sans-one text-yellow-100">
              +
            </p>
          </div>
          <p className="font-racing-sans-one text-blue-75 text-2xl">
            Project completed
          </p>
        </div>

        {/* Media Featured */}
        <div ref={countThree} className="border-b-4 border-yellow-100">
          <div className="flex gap-2">
            <CountUp
              value={125}
              duration={3}
              animation="easeOutExpo"
              color="#F5F5DC"
              className="text-5xl font-bold font-racing-sans-one"
              start={startThree}
            />
            <p className="font-extrabold text-3xl font-racing-sans-one text-yellow-100">
              +
            </p>
          </div>
          <p className="font-racing-sans-one text-blue-75 text-2xl">
            Media Featured
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="h-full flex justify-center items-center">
        {/* background text */}
        <div
          ref={textOneRef}
          className="absolute top-44 size-80 sm:absolute sm:size-[900px] sm:max-h-fit"
        >
          <img src={assets.shoulder} className="w-[896px]" />
        </div>

        {/* Girl Image */}
        <div
          ref={girlRef}
          className="absolute size-[950px] left-[21%]  inset-0 flex justify-center items-center z-20"
        >
          <img
            src={assets.Girl_img}
            className="relative size-[700px] object-cover sm:size-9/12 bottom-20"
          />
        </div>

        {/* Stroke Image */}
        <div
          ref={textTwoRef}
          className="absolute top-44 size-80 sm:absolute sm:size-[900px] z-50 sm:max-h-fit"
        >
          {/* Mobile Image */}
          <img src={assets.shoulderStrokeFour} className="sm:hidden" />

          {/* desktop image */}
          <img
            src={assets.shoulderStrokeThree}
            className="hidden sm:w-[900px] sm:block"
          />
        </div>
      </div>

      {/* Rotating */}
      <div className="hidden  sm:absolute sm:block top-30 right-10">
        <img
          ref={rotateRef}
          src={assets.rotateicon}
          className="origin-center"
        />
      </div>


    </div>
  );
};

export default Hero;
