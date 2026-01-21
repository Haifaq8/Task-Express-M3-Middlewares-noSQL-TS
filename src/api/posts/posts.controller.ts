import { Request, Response } from "express";
import Post from "../../models/Post";
import Author from "../../models/Author";

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, body, authorId } = req.body;

        // Handle image upload if file was provided
        if (req.file) {
            req.body.image = req.file.path;  // Save the file path
        }

        // Check if author exists
        const author = await Author.findById(authorId);
        if (!author) {
            res.status(404).json({ error: "Author not found" });
            return;
        }

        // Create the post with all fields including image
        const post = await Post.create({
            title,
            body,
            author: authorId,
            image: req.body.image  // Will be undefined if no file uploaded
        });

        // Add post to author's posts array
        await Author.findByIdAndUpdate(
            authorId,
            { $push: { posts: post._id } },
            { new: true }
        );

        res.status(201).json(post);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find().populate("author");
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};