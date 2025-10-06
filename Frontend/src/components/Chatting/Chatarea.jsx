import { useContext, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader.jsx";
import ChatInput from "./ChatInput.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
import { StoreContext } from "../../context/StoreContext.jsx";

const Chatarea = () => {
  const {
    selectedUserId,
    getMessage,
    messages,
    subscribeToMessages,
    unSubscribeToMessages,
    setMessages, 
  } = useContext(SocketContext);

  const { authUser } = useContext(StoreContext);

  // ✅ Ref for auto-scrolling
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (selectedUserId && selectedUserId._id) {
      // ✅ clear old chat instantly when switching users
      setMessages([]);

      // ✅ fetch new chat and start listening
      getMessage(selectedUserId._id);
      subscribeToMessages();



      // ✅ cleanup old listener when leaving user
      return () => unSubscribeToMessages();
    }
  }, [selectedUserId]); // ✅ only runs when selected user changes


  useEffect(() => {
  console.log("Updated messages:", messages);
}, [messages]);

  // ✅ Scroll to bottom when messages update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full h-full rounded-tr-xl rounded-br-xl p-1">
      {selectedUserId ? (
        <div className="h-full w-full bg-white-100 flex flex-col gap-1">
          {/* Header */}
          <div className="w-full h-1/12">
            <ChatHeader />
          </div>

          {/* Main Chat Area */}
          <div className="w-full flex-grow border overflow-y-auto px-3 py-2">
            {Array.isArray(messages) &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    msg.senderId === authUser?._id ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-header mb-1">
                    <time className="text-xs opacity-50 ml-1">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </time>
                  </div>
                  <div className="chat-bubble flex">
                    {msg.text && <p className="text-xs">{msg.text}</p>}
                  </div>
                </div>
              ))}

            {/* ✅ Invisible element for auto-scroll */}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input Area */}
          <div className="w-full h-1/12 border-t border-gray-300 pt-2">
            <ChatInput />
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center gap-1">
          <p className="text-gray-300 font-outfit">No user selected</p>
        </div>
      )}
    </div>
  );
};

export default Chatarea;
