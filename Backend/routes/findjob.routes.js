import express from "express";
import { getAllJob , tagJobs } from "../controller/findJob.js";

const findJobRouter = express.Router();

findJobRouter.get("/findalljobs" , getAllJob);
findJobRouter.get("/tagjobs" , tagJobs)


export default findJobRouter;