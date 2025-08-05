import express from "express"
import protectedRoute from "../middleware/protectedRoute.js";
import { profilePic , backgroundPic } from "../controller/profile.js";

const profileRouter = express.Router();

profileRouter.post("/upload-profile-pic" ,protectedRoute , profilePic );
profileRouter.post("/upload-background-pic" ,protectedRoute , backgroundPic );


export default profileRouter;