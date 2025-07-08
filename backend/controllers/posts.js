import { Post } from "../models/blogs.js"

export const allBlogs=async (req, res, next)=>{
  
   const blogs = await Post.find({});
   res.json({
    success:true,
    blogs:blogs
   })
}

export const likePost=async (req, res, next)=>{
  const {id} = req.params;
  if(!post)return res.status(400).json({success:true, message:"Post does not exist."});
  const post = await Post.findById(id);
  post.likes = post.likes + 1;
  await post.save();
  res.json({
   success:true,
   message:"liked!"
  });
}

  export const deletePost=async (req, res, next)=>{
  const{id}=req.params;
  const post= await Post.findById(id);
  if(!post)return res.status(400).json({success:true, message:"Post does not exist."});
  await post.deleteOne();
  res.status(200).json({
   success:true,
   message:"deleted"
  })
}

export const updatePost=async(req, res, next)=>{
  const{id}=req.params;
  const{text} = req.body;
  const post = await Post.findById(id);
  if(!post)return res.status(400).json({success:true, message:"Post does not exist."});
  // console.log(post.author.toString());
  // console.log(req.user._id);
  if(!(post.author.toString() === req.user._id.toString())) return res.status(400).json({success:false, message:"Unauthorized request. Please contact the author of the blog."})
  post.body = text;
  await post.save();
  res.status(200).json({
    success:true,
    message:"updated successfully!"
  })

}