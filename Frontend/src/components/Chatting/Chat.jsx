import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { RxCross2 } from "react-icons/rx";
import { RiSendPlaneFill } from "react-icons/ri";
import { SocketContext } from "../../context/SocketContext";

const Chat = ({ setActiveChat, userId, recipientId }) => {
  const {
    onlineUsers,
    initializeSocket,
    closeSocket,
    getMessage,
    selectedUserId,
    subscribeToMessages,
    unSubscribeToMessages,
    sendMessage,
    messages,
  } = useContext(SocketContext);

  const messageEndRef = useRef(null);

  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    console.log("userId in chat =>", userId);

    initializeSocket(userId);
    return () => closeSocket();
  }, [userId, initializeSocket, closeSocket]);

  useEffect(() => {
    getMessage(selectedUserId._id);
    subscribeToMessages();

    return () => unSubscribeToMessages();
  }, [getMessage, selectedUserId, subscribeToMessages, unSubscribeToMessages]);

  useEffect(() => {
  console.log("📩 Updated messages:", messages);
}, [messages]);


  const isRecipientOnline = onlineUsers.includes(recipientId);

  return (
    <div className="w-full h-full rounded-lg p-3 flex flex-col justify-between">
      {/* header */}
      <div className="flex justify-between border-b-2 border-gray-200 pb-3">
        {/* profile pic */}
        <div className="flex gap-2">
          <img src={assets.userDefaultImage} className="size-12" />
          <div className="flex flex-col">
            <p className="text-gray-300 font-outfit font-semibold text-lg">
              Random user
            </p>
            <p
              className={`font-outfit text-sm ${
                isRecipientOnline ? "text-green-500" : "text-gray-400"
              }`}
            >
              {isRecipientOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* close btn */}
        <button
          onClick={() => setActiveChat(false)}
          className="bg-gray-200 size-6 rounded-full p-1"
        >
          <RxCross2 />
        </button>
      </div>

      {/* Chat Area */}
      <div className="h-9/12">
        {Array.isArray(messages) && messages?.map((msg, index) => {
          return (
            <div
              key={index}
              className={`chat ${
                msg.senderId === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">{msg.createdAt}</time>
              </div>
              <div className="chat-bubble flex">
                {msg.text && <p className="text-xs">{msg.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* input area */}
      <div className="w-full h-12 rounded-full border-2 mt-3 flex items-center justify-between px-3 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputMessage.trim() === "") return;
            sendMessage({ text: inputMessage });
            setInputMessage("");
          }}
          className="flex items-center w-full gap-2"
        >
          <input
            type="text"
            name="chat"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent  focus:outline-none px-3 font-outfit text-lg"
          />
          <button type="submit" className="text-blue-500 hover:text-blue-400">
            <RiSendPlaneFill className="size-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
