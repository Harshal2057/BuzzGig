import express from "express";
import { getAllJob , tagJobs ,findClientJobs , favJobs } from "../controller/findJob.js";
import protectedRoute from "../middleware/protectedRoute.js"

const findJobRouter = express.Router();

findJobRouter.get("/findalljobs" , getAllJob);
findJobRouter.get("/tagjobs" , tagJobs);
findJobRouter.get("/clientjobs/:clientId" , findClientJobs);
findJobRouter.patch("/favJobs/:jobId" , protectedRoute , favJobs);


export default findJobRouter;