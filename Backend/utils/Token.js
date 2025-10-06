import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const privateKey = process.env.JWT_PRIVATE_KEY;

const generateToken = async(userId , res) => {
    try {
        
        const token = jwt.sign({id:userId} , privateKey , {expiresIn : "7d"});

        res.cookie("jwtToken" , token , {
             maxAge:7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            secure:process.env.NODE_ENV !== "development",
            sameSite:"strict"
        })

        return token;

    } catch (error) {
        console.error("Error generating token:", error.message);
         return null;
    }
}

export default generateToken;