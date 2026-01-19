import express from "express";
import { createAuthor, getAllAuthors } from "./authors.controller";

const authorRouter = express.Router();

authorRouter.post("/", createAuthor);
authorRouter.get("/", getAllAuthors);

export default authorRouter;
