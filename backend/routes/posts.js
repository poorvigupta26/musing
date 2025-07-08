import express from "express";
import { allBlogs, comment, deletePost, getComments, individualPost, likePost, updatePost } from "../controllers/posts.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { errorHandler } from "../middlewares/error.js";

const router = express.Router();

router.get("/", allBlogs);
router.route("/:id")
.put(likePost)
.delete(isAuthenticated, deletePost)
.get(individualPost)
.post(comment);
router.put("/myPosts/:id", isAuthenticated, updatePost);
router.get("/comments/:id", getComments)

export default router;