import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../models/blogs.js";

export const getProfile=(req, res, next)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
}

export const login=async(req, res, next)=>{
   const{email, password} = req.body;
    const userExists = await User.findOne({email});
    if(!userExists)return res.json({success:false, message:"Email does not exist. Sign up first."});
    const user = await User.findOne({email}).select("+password");
    const verifyPass= await bcrypt.compare(password, user.password);
    if(!verifyPass) return res.json({success:false, message:"incorrect pass or email"});
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
    res.status(200).cookie("token", token,{
        httpOnly:true,
    }).json({
        success:true,
        message:"logged in"
    })
}

export const signup=async (req, res, next)=>{
 const {name, email, password}= req.body;
 const Ifuser= await User.findOne({email});
 if(Ifuser) return res.json({success:false, message:"user already exists."})
 const hashedPass = await bcrypt.hash(password, 10);
 const user = await User.create({name, email, password:hashedPass});
 const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
 res.status(200).cookie("token", token,{
    httpOnly:true,
 }).json({
    success:true,
    message:"user created"
 })

}

export const logout=(req, res, next)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"logged out!"
    })
}

export const createBlog=async (req, res, next)=>{
   const {title, body, img}=req.body;
   const user = await Post.create({title, body, img, author:req.user});
   res.status(200).json({
    success:true,
    post:user,
   })

}