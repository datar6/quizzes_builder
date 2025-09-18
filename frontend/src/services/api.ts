import { CreateQuizRequest, Quiz, QuizListItem } from "@/types/quiz";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const quizService = {
	async getQuizzes(): Promise<QuizListItem[]> {
		const response = await fetch(`${API_BASE_URL}/quizzes`);
		if (!response.ok) {
			throw new Error("Failed to fetch quizzes");
		}
		return response.json();
	},

	async getQuiz(id: string): Promise<Quiz> {
		const response = await fetch(`${API_BASE_URL}/quizzes/${id}`);
		if (!response.ok) {
			throw new Error("Failed to fetch quiz");
		}
		return response.json();
	},

	async createQuiz(quizData: CreateQuizRequest): Promise<Quiz> {
		const response = await fetch(`${API_BASE_URL}/quizzes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(quizData),
		});
		if (!response.ok) {
			throw new Error("Failed to create quiz");
		}
		return response.json();
	},

	async deleteQuiz(id: string): Promise<void> {
		const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Failed to delete quiz");
		}
	},
};
