import express from "express";
import morgan from "morgan";
import path from "path";

import authorRoutes from "./api/authors/authors.routes";
import postRoutes from "./api/posts/posts.routes";
import tagRoutes from "./api/tags/tags.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { notFound } from "./middlewares/notFound.middleware";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/media", express.static(path.join(__dirname, "../media")));

app.use("/posts", postRoutes);
app.use("/authors", authorRoutes);
app.use("/tags", tagRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
