import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        required:true
    }
})

export const User = mongoose.model("User", userSchema);