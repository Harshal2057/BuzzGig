import express from "express"
import protectedRoute from "../middleware/protectedRoute.js";
import {updateClientProfile, profilePic , backgroundPic , freelancerProfile , freelancerAbout , freelancerSkills , freelancerProject , freelancerEducation , getFreelancerProfile , getClientProfile } from "../controller/profile.js";

const profileRouter = express.Router();

profileRouter.patch("/updateclient" , protectedRoute , updateClientProfile);
profileRouter.post("/upload-profile-pic" ,protectedRoute , profilePic );
profileRouter.post("/upload-background-pic" ,protectedRoute , backgroundPic );
profileRouter.post("/updatefreelancer" , protectedRoute , freelancerProfile);
profileRouter.post("/updatefreelancerabout" , protectedRoute , freelancerAbout);
profileRouter.post("/updatefreelancerskills" , protectedRoute , freelancerSkills);
profileRouter.post("/updatefreelancereducation" , protectedRoute , freelancerEducation);
profileRouter.post("/uploadproject" , protectedRoute , freelancerProject);
profileRouter.get("/get-freelancer" , protectedRoute , getFreelancerProfile)
profileRouter.get("/get-client" , protectedRoute , getClientProfile)


export default profileRouter;