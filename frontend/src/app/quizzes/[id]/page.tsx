// frontend/src/app/quizzes/[id]/page.tsx
"use client";

import { quizService } from "@/services/api";
import { Quiz } from "@/types/quiz";
import { ArrowLeft, Check, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [quiz, setQuiz] = useState<Quiz | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const quizId = params.id as string;

	useEffect(() => {
		const fetchQuiz = async () => {
			try {
				setLoading(true);
				const data = await quizService.getQuiz(quizId);
				setQuiz(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load quiz");
			} finally {
				setLoading(false);
			}
		};

		if (quizId) {
			fetchQuiz();
		}
	}, [quizId]);

	if (loading) {
		return (
			<div className="max-w-4xl mx-auto py-8">
				<div className="text-center py-12">Loading quiz...</div>
			</div>
		);
	}

	if (error || !quiz) {
		return (
			<div className="max-w-4xl mx-auto py-8">
				<div className="text-center py-12 text-red-600">
					<p>Error: {error || "Quiz not found"}</p>
					<Link
						href="/quizzes"
						className="text-blue-600 hover:underline mt-4 inline-block"
					>
						← Back to Quizzes
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto py-8">
			{/* Header */}
			<div className="flex items-center gap-4 mb-6">
				<Link
					href="/quizzes"
					className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
				>
					<ArrowLeft size={20} />
				</Link>
				<h1 className="text-3xl font-bold">{quiz.title}</h1>
			</div>

			{/* Quiz Info */}
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span className="font-semibold">Total Questions:</span>{" "}
						{quiz.questions.length}
					</div>
					<div>
						<span className="font-semibold">Created:</span>{" "}
						{new Date(quiz.createdAt).toLocaleDateString()}
					</div>
				</div>
			</div>

			{/* Questions */}
			<div className="space-y-6">
				<h2 className="text-2xl font-semibold">Questions</h2>

				{quiz.questions.map((question, index) => (
					<div key={question.id} className="border rounded-lg p-6 bg-white">
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
									Question {index + 1}
								</span>
								<span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
									{question.type.toUpperCase()}
								</span>
							</div>
						</div>

						{/* Question Text */}
						<h3 className="text-lg font-medium mb-4">{question.question}</h3>

						{/* Answer Section */}
						<div className="border-t pt-4">
							<h4 className="font-semibold text-gray-700 mb-3">
								Correct Answer:
							</h4>

							{question.type === "boolean" && (
								<div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
									<Check className="text-green-600" size={20} />
									<span className="font-medium">
										{question.correctAnswer ? "True" : "False"}
									</span>
								</div>
							)}

							{question.type === "input" && (
								<div className="p-3 bg-green-50 border border-green-200 rounded-lg">
									<span className="font-medium">{question.correctAnswer}</span>
								</div>
							)}

							{question.type === "checkbox" && (
								<div className="space-y-2">
									{question.options.map((option, optionIndex) => (
										<div
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={optionIndex}
											className={`flex items-center gap-3 p-3 rounded-lg border ${
												question.correctAnswers.includes(option)
													? "bg-green-50 border-green-200"
													: "bg-gray-50 border-gray-200"
											}`}
										>
											{question.correctAnswers.includes(option) ? (
												<Check className="text-green-600" size={20} />
											) : (
												<X className="text-gray-400" size={20} />
											)}
											<span
												className={
													question.correctAnswers.includes(option)
														? "font-medium"
														: ""
												}
											>
												{option}
											</span>
											{question.correctAnswers.includes(option) && (
												<span className="ml-auto text-sm text-green-600 font-medium">
													Correct
												</span>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Back Button */}
			<div className="mt-8">
				<Link
					href="/quizzes"
					className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
				>
					<ArrowLeft size={16} />
					Back to All Quizzes
				</Link>
			</div>
		</div>
	);
}
