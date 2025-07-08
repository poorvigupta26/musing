import jwt from "jsonwebtoken";

export const setCookie=(res, user, message, statusCode=200)=>{
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    res.status(statusCode).cookie("token", token,{
    httpOnly:true,
    maxAge: 1000*60*15,
    sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax":"none",
    secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true
 }).json({
    success:true,
    message
 })
};