import React from "react";
import { assets , jobFields } from "../assets/assets";
import { ArrowUpRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cards = ({ img , title , Desccription , index}) => {

    const isOdd = index % 2 ;

    return <div className={`${isOdd == 1 ? "bg-blue-100" : "bg-gray-400"} w-[300px] h-[300px] p-3 flex flex-col gap-3 rounded-2xl hover:scale-110 transition-all duration-300 ease-in-out`}>
            {/* img */}
            <div className="w-fit rounded-full p-1 bg-yellow-100">
                <FontAwesomeIcon icon={img}  className="text-4xl"/>
            </div>

            {/* title & button */}
            <div className="flex items-center justify-between border-b-2 border-gray-100 p-2">
                    {/* title */}
                    <div className="text-3xl text-white font-anton">
                        <p>{title}</p>
                    </div>

                    {/* button */}
                    <div className="w-fit bg-yellow-100 rounded-full">
                        <ArrowUpRight size={60} strokeWidth={1} className=" hover:rotate-45 transition-all duration-200 ease-"/>
                    </div>
            </div>



            {/* Description */}
            <div className="font-outfit text-white">
                <p>{Desccription}</p>
            </div>
    </div>
}

const Searching = () => {
  return (
    <div
      className="relative min-h-screen w-screen overflow-x-hidden p-5 px-20"
      style={{
        backgroundColor: "#E3E3E3",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      {/* Top conatiner */}
      <div className="w-full mb-10">
            {/* leftmost container */}
                <div className="flex flex-col gap-6">
                    {/* Goals */}
                    <div className="flex gap-3 items-center">
                        <img src={assets.bulletThree} className="size-12" />
                        <div className="text-2xl text-gray-100 font-anton">
                        <p>Simplify your Goals</p>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className=" w-3/6 text-6xl font-anton">
                        <p>Our Freelancer will take it from here</p>
                    </div>
                </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-10 p-2">
            {
                    jobFields.map((job , index) => {
                        return <Cards key={index} img={job.image} title={job.title} Desccription={job.description} index={index} />
                    })
            }
      </div>
    </div>
  );
};

export default Searching;
