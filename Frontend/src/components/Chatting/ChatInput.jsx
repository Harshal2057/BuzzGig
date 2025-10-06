import React, { useContext, useState } from 'react'
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineAttachFile } from "react-icons/md";
import { SocketContext } from '../../context/SocketContext';

const ChatInput = () => {

  const {sendMessage} = useContext(SocketContext)

  const [messageInput , setMessageInput] = useState("")

    const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim() === "") return;

    sendMessage({ text: messageInput }); // ✅ Correct variable name
    setMessageInput(""); // ✅ Reset the input after sending
  };

  return (
    <form className='w-full h-full  rounded-full'
          onSubmit={handleSubmit}
    >
            {/* Main Container */}
            <div className='w-full h-full flex items-center gap-4 '>
                    <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} name="chat" id="" className='w-5/6 h-full rounded-full border-1 px-3 font-outfit text-gray-300'/>
                    <MdOutlineAttachFile className='size-10 border-1 rounded-full p-1' />
                  <button type='submit'>  <RiSendPlaneFill className='size-10 border-1 rounded-full p-1'/> </button> 
            </div>
    </form>
  )
}

export default ChatInput