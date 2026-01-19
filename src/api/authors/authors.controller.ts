import { Request, Response } from "express";
import Author from "../../models/Author";

export const createAuthor = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const author = await Author.create({ name });
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await Author.find().populate("posts");
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
