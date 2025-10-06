// socket.js
import { io } from "socket.io-client";
import { StoreContext } from "../context/StoreContext";

let socket = null;
let onlineUsers = [];

export const connectSocket = (userId, onOnlineUsers) => {
  if (!socket) {
    socket = io("http://localhost:4000", { query: { userId } });

    socket.connect();

    socket.on("getOnlineUsers", (userIds) => {
      onlineUsers = userIds;
      if (onOnlineUsers) onOnlineUsers(userIds);
    });
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    onlineUsers = [];
  }
};

export const getOnlineUsers = () => onlineUsers;
