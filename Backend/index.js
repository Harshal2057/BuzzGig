import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";


//Local
import { dbConnect } from "./config/database.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 4000  ;

const app = express();
dbConnect();

//middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth" , authRouter);


app.use("/" , (req , res) => {
    res.send("<h1>BuzzGig</h1>")
})

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
