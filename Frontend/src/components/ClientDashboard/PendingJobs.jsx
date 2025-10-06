import React from 'react'
import { assets } from "../../assets/assets";
import { TiTick } from "react-icons/ti";

const PendingJobs = () => {
  return (
         <div
      style={{
        backgroundColor: "#FF8C00",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
      className="h-fit w-[280px]  p-3 rounded-2xl flex flex-col gap-5"
    >

      {/* Main Container */}
      <div className="w-full h-full">
            {/* heading */}
            <div className="flex flex-col gap-4">
                <div className='flex gap-3'>
                <p className="font-outfit text-white text-2xl">Pending Jobs</p>
                <div className='text-white text-2xl border-2 border-white w-fit p-1 rounded-full'> <TiTick /> </div>
                </div>
                <p className="font-outfit text-white text-3xl rounded-full border-2 border-white w-fit px-2 p-1">10</p>
            </div>
            <div className="underline underline-offset-2 text-white">
                <p className="font-outfit text-sm text-white">view all completed jobs</p>
            </div>
      </div>

    </div>
  )
}

export default PendingJobs