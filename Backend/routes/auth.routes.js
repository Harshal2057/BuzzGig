import express from "express";
import passport from "passport";
import { signUp, login, logOUt, checkAuth, updateRole } from "../controller/auth.js";
import protectedRoute from "../middleware/protectedRoute.js";
import "../config/googleStratergy.js";

const authRouter = express.Router();

// Local Auth routes
authRouter.post("/signup", signUp);          // POST /api/auth/signup
authRouter.post("/login", login);            // POST /api/auth/login
authRouter.post("/logout", logOUt);          // POST /api/auth/logout
authRouter.get("/checkauth", protectedRoute, checkAuth);  // GET /api/auth/checkauth
authRouter.post("/updaterole", protectedRoute, updateRole); // POST /api/auth/updaterole

// Google Auth routes
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
authRouter.get(
  "/google/choose-role",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login", // redirect to frontend login page if failed
  }),
  (req, res) => {
    // On success, redirect to frontend choose-role page
    res.redirect("http://localhost:5173/choose-role");
  }
);

export default authRouter;
