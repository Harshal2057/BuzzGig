import express from "express";
import { getAllUser , getMessages , sendMessages } from "../controller/messages.js";
import protectedRoute from "../middleware/protectedRoute.js";

const messageRouter = express.Router();

messageRouter.get("/getUsers" , protectedRoute , getAllUser);
messageRouter.get("/getMessages/:id", protectedRoute , getMessages);
messageRouter.post("/sendMessage/:id", protectedRoute , sendMessages);

export default messageRouter