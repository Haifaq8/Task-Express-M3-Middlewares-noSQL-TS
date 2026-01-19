import { Request, Response, RequestHandler } from "express";
import Post from "../../models/Post";
import Author from "../../models/Author";

export const createPost: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { title, body, authorId } = req.body;

        const author = await Author.findById(authorId);
        if (!author) {
            res.status(404).json({ error: "Author not found" });
            return;
        }

        const post = await Post.create({
            title,
            body,
            author: authorId
        });

        await Author.findByIdAndUpdate(
            authorId,
            { $push: { posts: post._id } },
            { new: true }
        );

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getPosts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate("author").populate("tags");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updatePost: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;

        const post = await Post.findByIdAndUpdate(
            id,
            { title, body },
            { new: true }
        ).populate("author");

        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deletePost: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        if (post.author) {
            await Author.findByIdAndUpdate(post.author, {
                $pull: { posts: post._id }
            });
        }

        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
