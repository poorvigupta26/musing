import express from "express";
import { allBlogs, deletePost, likePost, updatePost } from "../controllers/posts.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", allBlogs);
router.route("/:id")
.put(likePost)
.delete(isAuthenticated, deletePost)
router.put("/myPosts/:id", isAuthenticated, updatePost);


export default router;