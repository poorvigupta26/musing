import { Post } from "../models/blogs.js"
import { Comments } from "../models/comments.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const allBlogs=async (req, res, next)=>{
  try {
    const blogs = await Post.find({});
   if(!blogs) return next(new ErrorHandler("No blogs yet.", 404));
   res.json({
    success:true,
    blogs:blogs
   })
  } catch (error) {
    next(error);
  }
   
}

export const likePost=async (req, res, next)=>{
  try {
    const {id} = req.params;
    const post = await Post.findById(id);
    if(!post) return next(new ErrorHandler("Post does not exist", 400));
    post.likes = post.likes + 1;
    await post.save();
    res.json({
     success:true,
     message:"liked!"
    });
  } catch (error) {
    next(error);
  }
}

  export const deletePost=async (req, res, next)=>{
  try {
    const{id}=req.params;
    const post= await Post.findById(id);
    if(!post)return next(new ErrorHandler("Post does not exist", 400));
     await Comments.deleteMany({post:id});
    await post.deleteOne();
    res.status(200).json({
     success:true,
     message:"deleted"
    })
  } catch (error) {
    next(error);
  }
}

export const updatePost=async(req, res, next)=>{
  try {
    const{id}=req.params;
    const{text} = req.body;
    const post = await Post.findById(id);
    if(!post)return next(new ErrorHandler("Post does not exist", 400));
    if(!(post.author.toString() === req.user._id.toString())) return next(new ErrorHandler("Unauthorized request. Please contact the owner of the particular post.", 404))
    post.body = text;
    await post.save();
    res.status(200).json({
      success:true,
      message:"updated successfully!"
    })
  } catch (error) {
    next(error);
  }

}

export const individualPost=async(req, res, next)=>{
  try {
    const{id}=req.params;
    const post = await Post.findById(id);
    res.status(200).json({
      success:true,
      post: post
    })
  } catch (error) {
    next(error);
  }
}

export const comment = async(req, res, next)=>{
  try {
    const{id} = req.params;
    const{name, comment} = req.body;
    await Comments.create({name, comment, post:id});
    const post =await Post.findById(id);
    post.comments = post.comments + 1;
    await post.save();
    res.status(200).json({
      success:true,
      message:"comment added!"
    })
  } catch (error) {
    next(error);
  }
}

export const getComments = async(req, res, next)=>{
  try {
    const{id}=req.params;
    const comments = await Comments.find({post:id});
    res.status(200).json({
      success:true,
      comments:comments
    })
  } catch (error) {
    next(error);
  }
}