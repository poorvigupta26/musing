import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
    name:{
        type:String,
        default:"anonymous"
    },
    comment:{
        type:String,
        required:true
    },
    post : {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Post",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Comments = mongoose.model("Comments", commentsSchema); 