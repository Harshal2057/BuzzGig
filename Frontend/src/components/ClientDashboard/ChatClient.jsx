import React from 'react'
import { assets } from '../../assets/assets'
import { FaArrowRight } from "react-icons/fa";

const ChatClient = () => {
  return (
           <div
      style={{
        backgroundColor: "#F8F8FF",
        backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow:" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }}
      className="h-fit w-[370px] bg- p-3 rounded-2xl flex flex-col gap-5"
    >
      <div className="flex justify-between items-center">
        <p className='font-outfit text-xl font-semibold'>Chats</p>
       <div className='text-xs font-light'><FaArrowRight /></div> 
      </div>

<div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-2">
        {Array(12).fill(0).map((_, i) => (
          <div className="flex justify-between items-center p-2 rounded-2xl hover:bg-amber-50" key={i}>
            <div className="flex items-center gap-2">
              {/* Img */}
              <img src={assets.userDefaultImage} className="size-10" />
              {/* Name & msg */}
              <div>
                <p className="font-outfit font-semibold">Shawn Mendes</p>
                <p className="text-xs text-gray-400">
                  ghhjsdgfu hdhjhdhudhfjdhjfhdj ...
                </p>
              </div>
            </div>

            <div className="bg-blue-85 w-fit h-fit px-2 rounded-full">
              <p className="font-outfit text-white">3</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default ChatClient