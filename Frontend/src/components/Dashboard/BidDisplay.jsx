import React from 'react'
import { assets } from '../../assets/assets'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const BidDisplay = () => {
  return (
      <div
      style={{
        backgroundColor: "#F8F8FF",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow:" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }}
      className="h-fit w-[250px] bg- p-3 rounded-2xl flex flex-col gap-5"
    >
      <div className="font-outfit ">
        <p className='text-xl font-semibold'>Proposal Status</p>
                <div className="flex items-center gap-2 text-xs">
                <p className="underline underline-offset-2  font-outfit">all proposals</p>
                <FaArrowRight />
                </div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='font-outfit text-gray-300 text-xl flex justify-between border-b-1 border-gray-50'>
            <div className='flex items-center gap-1'>
                    <div className='text-lg'><MdOutlinePending /></div>
                    <p>Pending</p>
                    <p className='font-outfit text-md'>3</p>
            </div>

            <div className='text-green-500'>
                <FaArrowCircleRight />
            </div>

        </div>

        <div className='font-outfit text-gray-300 text-xl flex justify-between border-b-1 border-gray-50'>
            <div className='flex items-center gap-1'>
                    <div className='text-lg'><FaRegThumbsUp /></div>
                    <p>Accepted</p>
                     <p className='font-outfit text-md'>3</p>
            </div>

            <div className='text-green-500'>
                <FaArrowCircleRight />
            </div>

        </div>

        <div className='font-outfit text-gray-300 text-xl flex justify-between border-b-1 border-gray-50'>
            <div className='flex items-center gap-1'>
                    <div className='text-lg'><FaRegThumbsDown /></div>
                    <p>Rejected</p>
                     <p className='font-outfit text-md'>3</p>
            </div>

            <div className='text-green-500'>
                <FaArrowCircleRight />
            </div>

        </div>
      </div>


    </div>
  )
}

export default BidDisplay