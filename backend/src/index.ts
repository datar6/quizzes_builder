import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import quizRoutes from "./routes/quizRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", quizRoutes);

app.get("/api/health", (req, res) => {
	res.json({ message: "Server is running!" });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
