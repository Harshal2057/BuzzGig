import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/User.js";

dotenv.config();

const privateKey = process.env.JWT_PRIVATE_KEY;

const protectedRoute = async (req , res , next) => {
    try {

        const token = req.cookies.jwtToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found!!"
            })
        }

        const decode =  jwt.verify(token, privateKey);

        if (!decode) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - Invalid Token"
            })
        }

        const user = await User.findById(decode.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success:false,
                message:"Unauthorized User"
            })
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occured in protected route => ${error}`
        })
    }
}

export default protectedRoute;