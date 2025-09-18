import { Router } from "express";
import {
	createQuiz,
	deleteQuiz,
	getQuiz,
	getQuizzes,
} from "../controllers/quizController";

const router = Router();

router.post("/quizzes", createQuiz);
router.get("/quizzes", getQuizzes);
router.get("/quizzes/:id", getQuiz);
router.delete("/quizzes/:id", deleteQuiz);

export default router;
