import express from "express";
import { createPost, getAllPosts } from "./posts.controller";
import { upload } from "../../middlewares/multer.middleware";  // Add this import

const postRouter = express.Router();

// Create a new post with optional image upload
postRouter.post("/", upload.single("image"), createPost);

// Get all posts (no changes needed)
postRouter.get("/", getAllPosts);

export default postRouter;