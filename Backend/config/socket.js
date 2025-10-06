import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const userSocketMap = {};

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
  }
});

export function getReceiverSocketId(userid) {
  return userSocketMap[userid];
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userid = socket.handshake.query.userId;

  if (userid) {
    userSocketMap[userid] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userid];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
