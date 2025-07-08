import express from "express";
import mongoose from "mongoose";
import mongoDB from "./data/database.js";
import userRouter from "./routes/user.js"
import postRouter from "./routes/posts.js"
import cookieParser from "cookie-parser";
import { config } from "dotenv";

const app = express();

config({
    path:"./data/config.env"
})

app.use(express.json());
app.use(cookieParser());


app.use("/users",userRouter);
app.use("/blogs", postRouter);

app.get("/",(req, res)=>{
    res.json({
        success:true,
        message:"welcome to musing"
    })
})

export default app;