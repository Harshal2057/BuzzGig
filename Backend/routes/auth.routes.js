import express from "express";
import {signUp , logOUt , login , checkAuth , updateRole} from "../controller/auth.js"
import protectedRoute from "../middleware/protectedRoute.js"

const authRouter = express.Router();

authRouter.post("/signup" , signUp);
authRouter.post("/login" , login);
authRouter.post("/logout" , logOUt);
authRouter.get("/checkauth" , protectedRoute , checkAuth);
authRouter.get("/updaterole" , protectedRoute , updateRole);

export default authRouter;