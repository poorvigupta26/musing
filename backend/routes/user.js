import express from "express";
import { createBlog, getProfile, login, logout, signup } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.get("/profile", isAuthenticated, getProfile);
router.get("/logout", logout);
router.post("/login", login );
router.post("/signup", signup);
router.post("/create",isAuthenticated, createBlog);

export default router;