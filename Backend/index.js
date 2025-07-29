import express from "express";
import dotenv from "dotenv"


//Local
import { dbConnect } from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
dbConnect();

app.use("/" , (req , res) => {
    res.send("<h1>BuzzGig</h1>")
})

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
