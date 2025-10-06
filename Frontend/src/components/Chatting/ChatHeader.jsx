import React, { use, useContext , useEffect } from 'react'
import { assets } from '../../assets/assets'
import { RxCross2 } from "react-icons/rx";
import { SocketContext } from '../../context/SocketContext';

const ChatHeader = () => {

  const {setSelectedUserId , selectedUserId} = useContext(SocketContext)

  useEffect(() => {
    console.log(selectedUserId);
  },[selectedUserId])

  return (
    <div className='w-full h-full border-b-1 border-gray-300'>
        {/* Main Container */}
        <div className='w-full h-full flex justify-between items-center gap-3 px-3'>

          {/* Left side */}
          <div className='flex  gap-2'>
                {/* Profile pic */}
                <img src={assets.userDefaultImage}  className='size-12'/>

                {/* Name and status */}
                <div className='flex flex-col'>
                    <p className='font-outfit font-semibold '>{selectedUserId?.name}</p>
                    <p className='text-gray-300 text-sm'>online</p>
                </div>
          </div>

          {/* Right side */}
          <div onClick={() => setSelectedUserId(null)}>
                <RxCross2 className='size-8'/>
          </div>
        </div>
    </div>
  )
}

export default ChatHeader