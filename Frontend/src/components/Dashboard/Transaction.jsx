import React from 'react'
import { assets } from '../../assets/assets'
import { FaArrowRight } from "react-icons/fa";

const Transaction = () => {
  return (
    <div
      style={{
        backgroundColor: "#F8F8FF",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }}
      className="h-fit p-3 rounded-2xl flex flex-col gap-5"
    >
      <div className="font-outfit">
        <p className="text-xl font-semibold">Payments</p>
        <div className="flex items-center gap-2 text-xs">
          <p className="underline underline-offset-2 font-outfit">all transactions</p>
          <FaArrowRight />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <div
            className="bg-white p-3 rounded-xl w-3/6"
            style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
          >
            <p className="text-sm font-outfit text-gray-600">Completed</p>
            <p className="font-outfit text-green-600 text-2xl font-bold">12</p>
          </div>

          <div className="bg-white p-3 rounded-xl w-3/6"
            style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
          >
            <p className="text-sm font-outfit text-gray-600">Pending</p>
            <p className="font-outfit text-orange-500 text-2xl font-bold">5</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3"
          style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
        >
          <p className="text-sm font-outfit text-gray-600">Total Earnings</p>
          <p className="font-outfit text-blue-600 text-2xl font-bold">$8,750</p>
        </div>
      </div>
    </div>
  )
}

export default Transaction