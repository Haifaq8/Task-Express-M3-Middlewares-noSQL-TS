import express from "express";
import connectDB from "./database";
import postsRoutes from "./api/posts/posts.routes";
import authorRoutes from "./api/authors/authors.routes";
import tagRoutes from "./api/tags/tags.routes";


const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());

app.use("/posts", postsRoutes);
app.use("/authors", authorRoutes);
app.use("/tags", tagRoutes);

connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
