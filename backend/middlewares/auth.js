import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated =async (req, res, next)=>{
    const{token}=req.cookies;
    if(!token){
        return res.json({
            success:false,
            message:"Log in to continue."
        })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken._id);
    next();

}