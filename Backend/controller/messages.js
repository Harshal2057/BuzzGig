import User from "../models/User.js";
import Message from "../models/Message.js";
import {getReceiverSocketId} from "../config/socket.js"
import { io } from "../config/socket.js";

const getAllUser = async(req , res) => {
    try {
        const loggedInUser = req.user._id;

        const fillteredUser = await User.find({_id:{$ne:loggedInUser}}).select("-password");

        return res.status(200).json({fillteredUser})

    } catch (error) {
                console.log(`Error occured while fetching all the user => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while fetching all the user => ${error}`,
        })
    }
}

const getMessages = async(req , res) => {
    try {

        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId}
            ]
        })

        return res.status(200).json({
            success:true,
            messages
        })
    } catch (error) {
                console.log(`Error occured while fetching messages from database => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while fetching messages from database => ${error}`
        })
    }
}

const sendMessages = async(req , res) => {
    try {
        
        const text = req.body.text;

        const {id:receiverId} = req.params;
        const senderId = req.user._id;


        const newMessage = await Message.create({
            senderId,
            receiverId,
            text
        })

        //Chatting functionality
        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage" , newMessage)
        }
            
        return res.status(200).json({
            success:true,
            message:"Success from Send Message",
            newMessage
        })

    } catch (error) {
                console.log(`Error occured while sending meassage => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while sending meassage => ${error}`
        })
    }
}

export {getAllUser , getMessages , sendMessages}