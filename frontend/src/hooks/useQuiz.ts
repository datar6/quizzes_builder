"use client";

import { quizService } from "@/services/api";
import { CreateQuizRequest, Quiz } from "@/types/quiz";
import { useState } from "react";

export const useQuiz = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createQuiz = async (
		quizData: CreateQuizRequest,
	): Promise<Quiz | null> => {
		try {
			setLoading(true);
			setError(null);
			return await quizService.createQuiz(quizData);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create quiz");
			return null;
		} finally {
			setLoading(false);
		}
	};

	const deleteQuiz = async (id: string): Promise<boolean> => {
		try {
			setLoading(true);
			setError(null);
			await quizService.deleteQuiz(id);
			return true;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to delete quiz");
			return false;
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		createQuiz,
		deleteQuiz,
	};
};
