import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport"

//Local
import { dbConnect } from "./config/database.js";
import cloudinaryConnect from "./config/cloudinary.js";
import "./config/googleStratergy.js";

//Routes
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";

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
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:'/tmp/'
}))

//Routes
app.use("/api/auth" , authRouter);
app.use("/api/profile" , profileRouter);

app.use("/" , (req , res) => {
    res.send('<a href="/api/auth/google">Sign In with Google</a>');
})

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
