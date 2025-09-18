"use client";

import { useQuiz } from "@/hooks/useQuiz";
import { quizService } from "@/services/api";
import { QuizListItem } from "@/types/quiz";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

export default function QuizList() {
	const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
	const [loading, setLoading] = useState(true);
	const { deleteQuiz: deleteQuizApi, error } = useQuiz();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		loadQuizzes();
	}, []);

	const loadQuizzes = async () => {
		try {
			setLoading(true);
			const data = await quizService.getQuizzes();
			setQuizzes(data);
		} catch (err) {
			console.error("Failed to load quizzes:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteQuiz = async (id: string) => {
		const success = await deleteQuizApi(id);
		if (success) {
			setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
		}
	};

	if (loading)
		return <div className="text-center py-8">Loading quizzes...</div>;
	if (error)
		return <div className="text-center py-8 text-red-600">Error: {error}</div>;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Available Quizzes</h2>
				<Link
					href="/create"
					className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
				>
					Create New Quiz
				</Link>
			</div>

			{quizzes.length === 0 ? (
				<div className="text-center py-12 text-gray-500">
					<p className="text-lg">No quizzes found.</p>
					<p className="mt-2">Create your first quiz to get started!</p>
				</div>
			) : (
				<div className="grid gap-4">
					{quizzes.map((quiz) => (
						<div
							key={quiz.id}
							className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<Link href={`/quizzes/${quiz.id}`} className="block">
										<h3 className="text-xl font-semibold hover:text-blue-600 transition-colors">
											{quiz.title}
										</h3>
									</Link>
									<p className="text-gray-600 mt-2">
										{quiz.questionsCount} question
										{quiz.questionsCount !== 1 ? "s" : ""}
									</p>
									<p className="text-sm text-gray-500 mt-1">
										Created: {new Date(quiz.createdAt).toLocaleDateString()}
									</p>
								</div>
								<DeleteButton
									onDelete={() => handleDeleteQuiz(quiz.id)}
									confirmMessage={`Are you sure you want to delete "${quiz.title}"?`}
								/>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
