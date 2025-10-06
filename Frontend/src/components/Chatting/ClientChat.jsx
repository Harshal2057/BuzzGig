import React from "react";
import ChatSidebar from "./ChatSidebar";
import SidebarClient from "../ClientDashboard/SidebarClient.jsx"
import Chatarea from "./Chatarea.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
import { useContext } from "react";
import { useEffect } from "react";

const ClientChat = () => {

  const {getUser,user} = useContext(SocketContext);

  useEffect(() => {
    getUser();
  },[getUser])

  return (
    <div className="w-full h-screen bg-gray-200 p-3"> {/* lock to viewport height */}
      {/* Main Container */}
      <div className="flex gap-2 h-full"> {/* make flex take full height */}
        {/* left div */}
        <div className="w-1/6 h-full ">
          <SidebarClient />
        </div>

        {/* Middle div */}
        <div className="w-1/6 h-full ">
          <ChatSidebar users={user}/>
        </div>

        {/* Right div */}
        <div className="w-4/6 h-full ">
            <Chatarea users={user}/>
        </div>
      </div>
    </div>
  );
};



export default ClientChat;
