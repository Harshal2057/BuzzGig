import express from "express"
import protectedRoute from "../middleware/protectedRoute.js";
import {updateClientProfile, profilePic , backgroundPic , freelancerProfile , freelancerInfo , freelancerProject } from "../controller/profile.js";

const profileRouter = express.Router();

profileRouter.patch("/updateclient" , protectedRoute , updateClientProfile);
profileRouter.post("/upload-profile-pic" ,protectedRoute , profilePic );
profileRouter.post("/upload-background-pic" ,protectedRoute , backgroundPic );
profileRouter.patch("/updatefreelancer" , protectedRoute , freelancerProfile);
profileRouter.patch("/updatefreelancerinfo" , protectedRoute , freelancerInfo);
profileRouter.post("/uploadproject" , protectedRoute , freelancerProject);


export default profileRouter;