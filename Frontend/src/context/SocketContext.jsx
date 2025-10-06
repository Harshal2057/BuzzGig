import { createContext, useState, useCallback, useEffect, useRef } from "react";
import { connectSocket, disconnectSocket } from "../utils/Socket";
import axios from "axios";
import toast from "react-hot-toast";

export const SocketContext = createContext(null);

const SocketContextProvider = (props) => {
  const url = "http://localhost:4000";

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); //selectedUser not id

  // Use ref to track current selected user for socket listeners
  const selectedUserIdRef = useRef(selectedUserId);

  useEffect(() => {
    selectedUserIdRef.current = selectedUserId;
  }, [selectedUserId]);

  // Connect Socket
  const initializeSocket = useCallback((userId) => {
    if (!userId) return;
    const newSocket = connectSocket(userId, setOnlineUsers);
    setSocket(newSocket);
  }, []);

  // Close Socket
  const closeSocket = useCallback(() => {
    disconnectSocket();
    setSocket(null);
    setOnlineUsers([]);
  }, []);

  // Get User
  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(url + "/api/messageroute/getUsers", {
        withCredentials: true,
      });
      setUser(response.data.fillteredUser);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong in getUser";
      toast.error(errorMessage);
    }
  }, []);

  // Get messages - memoized to prevent unnecessary re-renders
  const getMessage = useCallback(async (userId) => {
    try {
      const response = await axios.get(
        url + `/api/messageroute/getMessages/${userId}`,
        { withCredentials: true }
      );
      setMessages(response.data.messages);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong in getMessage";
      toast.error(errorMessage);
    }
  }, []);


  //Send messages
const sendMessage = useCallback(
  async (messageData) => {
    try {
      if (!selectedUserId?._id) return;

      await axios.post(
        url + `/api/messageroute/sendMessage/${selectedUserId._id}`,
        messageData,
        { withCredentials: true }
      );

      // DO NOT setMessages here
      // let the socket listener handle it
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong in sendMessage");
    }
  },
  [selectedUserId]
);


  // Subscribe to messages - using ref to avoid stale closure
  const subscribeToMessages = useCallback(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Use ref to get current selectedUserId
      const currentSelectedId = selectedUserIdRef.current;
      
      // Only add message if it's from the currently selected user
      if (currentSelectedId && newMessage.senderId === currentSelectedId._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    // Return cleanup function
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  // Unsubscribe to messages
  const unSubscribeToMessages = useCallback(() => {
    if (!socket) return;
    socket.off("newMessage");
  }, [socket]);

  const contextData = {
    socket,
    onlineUsers,
    initializeSocket,
    closeSocket,
    selectedUserId,
    setSelectedUserId,
    getMessage,
    subscribeToMessages,
    unSubscribeToMessages,
    sendMessage,
    messages,
    setMessages,
    getUser,
    user,
  };

  return (
    <SocketContext.Provider value={contextData}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;