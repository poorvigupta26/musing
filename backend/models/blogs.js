import mongoose from "mongoose";
import { type } from "os";

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String, 
        required:true,
    },
    img:{
        type:String
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:{
        type:Number,
        default:0,
    },
    comments:{
        type:Number,
        default:0
    }
});

export const Post = mongoose.model("Post", blogSchema);