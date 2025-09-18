import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreateQuizRequest } from "../types/quiz";

const prisma = new PrismaClient();

export const createQuiz = async (req: Request, res: Response) => {
	try {
		const { title, questions }: CreateQuizRequest = req.body;

		const quiz = await prisma.quiz.create({
			data: {
				title,
				questions: questions as any,
			},
		});

		res.json(quiz);
	} catch (error) {
		console.error("Error creating quiz:", error);
		res.status(500).json({ error: "Failed to create quiz" });
	}
};

export const getQuizzes = async (req: Request, res: Response) => {
	try {
		const quizzes = await prisma.quiz.findMany({
			select: {
				id: true,
				title: true,
				questions: true,
				createdAt: true,
			},
			orderBy: { createdAt: "desc" },
		});

		const quizzesWithCount = quizzes.map(
			(quiz: {
				id: number;
				title: string;
				questions: string | any[];
				createdAt: Date;
			}) => ({
				id: quiz.id,
				title: quiz.title,
				questionsCount: Array.isArray(quiz.questions)
					? quiz.questions.length
					: 0,
				createdAt: quiz.createdAt,
			}),
		);

		res.json(quizzesWithCount);
	} catch (error) {
		console.error("Error fetching quizzes:", error);
		res.status(500).json({ error: "Failed to fetch quizzes" });
	}
};

export const getQuiz = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const quiz = await prisma.quiz.findUnique({
			where: { id },
		});

		if (!quiz) {
			return res.status(404).json({ error: "Quiz not found" });
		}

		res.json(quiz);
	} catch (error) {
		console.error("Error fetching quiz:", error);
		res.status(500).json({ error: "Failed to fetch quiz" });
	}
};

export const deleteQuiz = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		await prisma.quiz.delete({
			where: { id },
		});

		res.json({ message: "Quiz deleted successfully" });
	} catch (error) {
		console.error("Error deleting quiz:", error);
		res.status(500).json({ error: "Failed to delete quiz" });
	}
};
