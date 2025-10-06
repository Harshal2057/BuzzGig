import React from 'react'
import { assets } from '../../assets/assets'
import { FaArrowRight } from "react-icons/fa";

const RecentClients = () => {
  return (
    <div
      style={{
        backgroundColor: "#F8F8FF",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }}
      className="h-fit w-4/6 p-3 rounded-2xl flex flex-col gap-5"
    >
      <div className="font-outfit">
        <p className="text-xl font-semibold">Recent Clients</p>
        <div className="flex items-center gap-2 text-xs">
          <p className="underline underline-offset-2 font-outfit">view all clients</p>
          <FaArrowRight />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        {/* Client 1 */}
        <div className="bg-white rounded-xl p-3 flex items-center gap-3"
          style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <p className="font-outfit font-semibold">John Doe</p>
            <p className="font-outfit text-sm text-gray-600">Web Development</p>
          </div>
          <p className="font-outfit text-green-600 font-semibold">$2,500</p>
        </div>

        {/* Client 2 */}
        <div className="bg-white rounded-xl p-3 flex items-center gap-3"
          style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
        >
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            SA
          </div>
          <div className="flex-1">
            <p className="font-outfit font-semibold">Sarah Adams</p>
            <p className="font-outfit text-sm text-gray-600">UI/UX Design</p>
          </div>
          <p className="font-outfit text-green-600 font-semibold">$1,800</p>
        </div>

        {/* Client 3 */}
        <div className="bg-white rounded-xl p-3 flex items-center gap-3"
          style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
        >
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
            MJ
          </div>
          <div className="flex-1">
            <p className="font-outfit font-semibold">Mike Johnson</p>
            <p className="font-outfit text-sm text-gray-600">Mobile App</p>
          </div>
          <p className="font-outfit text-green-600 font-semibold">$3,200</p>
        </div>
      </div>
    </div>
  )
}

export default RecentClients