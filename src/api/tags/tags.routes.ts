import express from "express";
import { createTag, getAllTags, addTagToPost } from "./tags.controller";

const tagRouter = express.Router();

tagRouter.post("/", createTag);
tagRouter.get("/", getAllTags);
tagRouter.post("/:postId/:tagId", addTagToPost);

export default tagRouter;
