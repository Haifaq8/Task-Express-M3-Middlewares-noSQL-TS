import app from "./app";
import connectDB from "./database";

const PORT = 8000;

const startServer = async (): Promise<void> => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

void startServer();
