import express from "express";
import mongoose from "mongoose";
import mongoDB from "./data/database.js";
import userRouter from "./routes/user.js"
import postRouter from "./routes/posts.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/error.js";

const app = express();

config({
    path:"./data/config.env"
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))


app.use("/users",userRouter);
app.use("/blogs", postRouter);

app.get("/",(req, res)=>{
    res.json({
        success:true,
        message:"Welcome to musing"
    })
})


app.use(errorHandler);

export default app;