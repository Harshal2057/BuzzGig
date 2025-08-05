import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport"

//Local
import { dbConnect } from "./config/database.js";
import authRouter from "./routes/auth.routes.js";
import cloudinaryConnect from "./config/cloudinary.js";
import "./config/googleStratergy.js";
dotenv.config();

const PORT = process.env.PORT || 4000  ;

const app = express();
dbConnect();
cloudinaryConnect();


//Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth" , authRouter);

app.use("/" , (req , res) => {
    res.send('<a href="/api/auth/google">Sign In with Google</a>');
})

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
