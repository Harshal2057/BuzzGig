import express from "express";
import passport from "passport";
import { signUp, login, logOUt, checkAuth, updateRole } from "../controller/auth.js";
import protectedRoute from "../middleware/protectedRoute.js";
import "../config/googleStratergy.js"

const authRouter = express.Router();

authRouter.post("/signup", signUp);//Register
authRouter.post("/login", login);//Local Login
authRouter.post("/logout", logOUt);
authRouter.get("/checkauth", protectedRoute, checkAuth);
authRouter.post("/updaterole", protectedRoute, updateRole);

authRouter.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

authRouter.get("/google/choose-role", passport.authenticate("google", {
  successRedirect: "/choose-role",
  failureRedirect: "/login"
}));


export default authRouter;
