import React from 'react'
import { assets } from "../../assets/assets";
import { TiTick } from "react-icons/ti";

const CompletedJobs = () => {
  return (
      <div
      style={{
        backgroundColor: "#F8F8FF",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
      className="h-fit w-[250px]  p-3 rounded-2xl flex flex-col gap-5"
    >

      {/* Main Container */}
      <div className="w-full h-full">
            {/* heading */}
            <div className="flex flex-col gap-4">
                <div className='flex gap-3'>
                <p className="font-outfit text-blue-85 text-2xl">Completed Jobs</p>
                <div className='text-blue-85 text-2xl border-2 border-blue-85 w-fit p-1 rounded-full'> <TiTick /> </div>
                </div>
                <p className="font-outfit text-blue-85 text-3xl rounded-full border-2 border-blue-85 w-fit px-2 p-1">10</p>
            </div>
            <div className="underline underline-offset-2 text-blue-85">
                <p className="font-outfit text-sm text-blue-85">view all completed jobs</p>
            </div>
      </div>

    </div>
  )
}

export default CompletedJobs