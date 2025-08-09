import express from "express"
import { postJob , deleteJob, getAllJobs } from "../controller/postJob.js"
import protectedRoute from "../middleware/protectedRoute.js"

const jobRouter = express.Router();

jobRouter.post("/postjob" , protectedRoute , postJob);
jobRouter.delete("/deletejob/:jobId" , protectedRoute , deleteJob);
jobRouter.get("/getalljobs" , protectedRoute , getAllJobs)

export default jobRouter;