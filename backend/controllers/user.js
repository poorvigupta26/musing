import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { Post } from "../models/blogs.js";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getProfile=(req, res, next)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
}

export const login=async(req, res, next)=>{
   try {
    const{email, password} = req.body;
     const userExists = await User.findOne({email});
     if(!userExists)return next(new ErrorHandler("Incorrect email or password.", 404));
     const user = await User.findOne({email}).select("+password");
     const verifyPass= await bcrypt.compare(password, user.password);
     if(!verifyPass)return next(new ErrorHandler("Incorrect email or password.", 404));
     setCookie(res, user, `Welcome ${user.name}`);
   } catch (error) {
    next(error);
   }
}

export const signup=async(req, res, next)=>{
 try {
    const {name, email, password}= req.body;
    const Ifuser= await User.findOne({email});
    if(Ifuser) return next(new ErrorHandler("User already exists!", 400))
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password:hashedPass});
    setCookie(res, user, "user created", 200);
 } catch (error) {
    next(error);
 }
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
  try {
     const {title, body, img}=req.body;
     const user = await Post.create({title, body, img, author:req.user});
     res.status(200).json({
      success:true,
      post:user,
     })
  } catch (error) {
    next(error);
  }

}