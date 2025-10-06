import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport"
import cors from "cors"

//Local
import { dbConnect } from "./config/database.js";
import cloudinaryConnect from "./config/cloudinary.js";
import "./config/googleStratergy.js";

//Routes
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import jobRouter from "./routes/job.routes.js";
import findJobRouter from "./routes/findjob.routes.js";
import messageRouter from "./routes/messages.routes.js"

//Socket
import { app , server } from "./config/socket.js";

dotenv.config();

const PORT = process.env.PORT || 4000  ;

dbConnect();
cloudinaryConnect();


//Allowed Frontend origins
const allowedOrigins = ["http://localhost:5173" , "http://localhost:5174"]

//Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:'/tmp/'
}))
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true  // Allow cookies & authentication headers
}));

//Routes
app.use("/api/auth" , authRouter);
app.use("/api/profile" , profileRouter);
app.use("/api/job" , jobRouter);
app.use("/api/findjob" , findJobRouter);
app.use("/api/messageroute" ,messageRouter )

// app.use("/" , (req , res) => {
//     res.send('<a href="/api/auth/google">Sign In with Google</a>');
// })

//use server instead of app 
server.listen(PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`);
    
})
