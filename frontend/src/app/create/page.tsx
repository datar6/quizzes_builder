"use client";

import { useQuiz } from "@/hooks/useQuiz";
import type { SimpleCreateQuizFormData } from "@/schemas/quiz";
import { simpleCreateQuizSchema } from "@/schemas/quiz";
import type { QuestionType } from "@/types/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateQuizPage() {
	const router = useRouter();
	const { createQuiz, loading, error } = useQuiz();

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm<SimpleCreateQuizFormData>({
		resolver: zodResolver(simpleCreateQuizSchema),
		defaultValues: {
			title: "",
			questions: [],
		},
	});

	const questions = watch("questions") || [];

	const addQuestion = (type: QuestionType) => {
		const newQuestion = {
			id: Date.now().toString(),
			type,
			question: "",
			// Use boolean true as default since setValueAs will handle conversion
			...(type === "boolean" && { correctAnswer: true }),
			...(type === "input" && { correctAnswer: "" }),
			...(type === "checkbox" && { options: ["", ""], correctAnswers: [] }),
		};

		setValue("questions", [...questions, newQuestion], {
			shouldValidate: true,
		});
	};

	const removeQuestion = (index: number) => {
		setValue(
			"questions",
			questions.filter((_, i) => i !== index),
			{ shouldValidate: true },
		);
	};

	const addOption = (questionIndex: number) => {
		const newQuestions = [...questions];
		if (newQuestions[questionIndex].type === "checkbox") {
			const checkboxQuestion = newQuestions[questionIndex] as any;
			checkboxQuestion.options = [...checkboxQuestion.options, ""];
			setValue("questions", newQuestions, { shouldValidate: true });
		}
	};

	const removeOption = (questionIndex: number, optionIndex: number) => {
		const newQuestions = [...questions];
		if (newQuestions[questionIndex].type === "checkbox") {
			const checkboxQuestion = newQuestions[questionIndex] as any;
			const optionToRemove = checkboxQuestion.options[optionIndex];

			// Remove the option
			checkboxQuestion.options = checkboxQuestion.options.filter(
				(_: any, i: number) => i !== optionIndex,
			);

			// Remove from correct answers if it was selected
			checkboxQuestion.correctAnswers = checkboxQuestion.correctAnswers.filter(
				(ans: string) => ans !== optionToRemove,
			);

			setValue("questions", newQuestions, { shouldValidate: true });
		}
	};

	const toggleCorrectAnswer = (questionIndex: number, option: string) => {
		const newQuestions = [...questions];
		if (newQuestions[questionIndex].type === "checkbox") {
			const checkboxQuestion = newQuestions[questionIndex] as any;
			const isSelected = checkboxQuestion.correctAnswers.includes(option);

			if (isSelected) {
				checkboxQuestion.correctAnswers =
					checkboxQuestion.correctAnswers.filter(
						(ans: string) => ans !== option,
					);
			} else {
				checkboxQuestion.correctAnswers = [
					...checkboxQuestion.correctAnswers,
					option,
				];
			}

			setValue("questions", newQuestions, { shouldValidate: true });
		}
	};

	const onSubmit = async (data: SimpleCreateQuizFormData) => {
		const quiz = await createQuiz(data);
		if (quiz) {
			router.push("/quizzes");
		}
	};

	return (
		<div className="max-w-4xl mx-auto py-8">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold">Create New Quiz</h1>
				<Link
					href="/quizzes"
					className="text-gray-600 hover:text-gray-800 transition-colors"
				>
					← Back to Quizzes
				</Link>
			</div>

			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				{/* Quiz Title */}
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Quiz Title *
					</label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
					<input
						{...register("title")}
						type="text"
						id="title"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter quiz title"
					/>
					{errors.title && (
						<p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
					)}
				</div>

				{/* Questions */}
				<div>
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold">Questions</h3>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => addQuestion("boolean")}
								className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
							>
								<Plus size={16} className="inline mr-1" />
								Boolean
							</button>
							<button
								type="button"
								onClick={() => addQuestion("input")}
								className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
							>
								<Plus size={16} className="inline mr-1" />
								Input
							</button>
							<button
								type="button"
								onClick={() => addQuestion("checkbox")}
								className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
							>
								<Plus size={16} className="inline mr-1" />
								Checkbox
							</button>
						</div>
					</div>

					{questions.length === 0 && (
						<div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
							<p>No questions added yet.</p>
							<p className="text-sm mt-1">
								Click buttons above to add questions
							</p>
						</div>
					)}

					{questions.map((question, questionIndex) => (
						<div
							key={question.id}
							className="border rounded-lg p-4 mb-4 bg-white"
						>
							<div className="flex justify-between items-start mb-3">
								<span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
									{question.type.toUpperCase()}
								</span>
								<button
									type="button"
									onClick={() => removeQuestion(questionIndex)}
									className="text-red-600 hover:text-red-800"
									aria-label="Delete question"
								>
									<Trash2 size={18} />
								</button>
							</div>

							{/* Question Text */}
							<div className="mb-4">
								<label
									htmlFor={`question-${questionIndex}`}
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Question *
								</label>
								<input
									{...register(`questions.${questionIndex}.question`)}
									id={`question-${questionIndex}`}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Enter your question"
								/>
								{errors.questions?.[questionIndex]?.question && (
									<p className="text-red-600 text-sm mt-1">
										{errors.questions[questionIndex]?.question?.message}
									</p>
								)}
							</div>

							{/* Question Type Specific Fields */}
							{question.type === "boolean" && (
								<div>
									<span className="block text-sm font-medium text-gray-700 mb-2">
										Correct Answer *
									</span>
									<div className="flex gap-4">
										<label className="flex items-center gap-2">
											<input
												type="radio"
												{...register(
													`questions.${questionIndex}.correctAnswer`,
													{
														setValueAs: (value: string) => value === "true",
													},
												)}
												value="true"
												className="w-4 h-4"
											/>
											True
										</label>
										<label className="flex items-center gap-2">
											<input
												type="radio"
												{...register(
													`questions.${questionIndex}.correctAnswer`,
													{
														setValueAs: (value: string) => value === "true",
													},
												)}
												value="false"
												className="w-4 h-4"
											/>
											False
										</label>
									</div>
									{errors.questions?.[questionIndex]?.correctAnswer && (
										<p className="text-red-600 text-sm mt-1">
											{errors.questions[questionIndex]?.correctAnswer?.message}
										</p>
									)}
								</div>
							)}

							{question.type === "input" && (
								<div>
									<label
										htmlFor={`answer-${questionIndex}`}
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Correct Answer *
									</label>
									<input
										{...register(`questions.${questionIndex}.correctAnswer`)}
										id={`answer-${questionIndex}`}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Enter correct answer"
									/>
									{errors.questions?.[questionIndex]?.correctAnswer && (
										<p className="text-red-600 text-sm mt-1">
											{errors.questions[questionIndex]?.correctAnswer?.message}
										</p>
									)}
								</div>
							)}

							{question.type === "checkbox" && (
								<div>
									<span className="block text-sm font-medium text-gray-700 mb-2">
										Options *
									</span>
									<div className="space-y-2">
										{(question as any).options.map(
											(option: string, optionIndex: number) => (
												<div
													key={optionIndex}
													className="flex items-center gap-2"
												>
													<button
														type="button"
														onClick={() =>
															toggleCorrectAnswer(questionIndex, option)
														}
														className={`p-1 rounded ${
															(question as any).correctAnswers.includes(option)
																? "bg-green-100 text-green-700"
																: "bg-gray-100 text-gray-700"
														}`}
														aria-label={
															(question as any).correctAnswers.includes(option)
																? "Unmark as correct answer"
																: "Mark as correct answer"
														}
													>
														{(question as any).correctAnswers.includes(
															option,
														) ? (
															<Check size={16} />
														) : (
															<X size={16} />
														)}
													</button>
													<input
														{...register(
															`questions.${questionIndex}.options.${optionIndex}` as const,
														)}
														className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
														placeholder={`Option ${optionIndex + 1}`}
														onChange={(e) => {
															const newValue = e.target.value;
															const oldValue = option;

															// Update the option value
															setValue(
																`questions.${questionIndex}.options.${optionIndex}` as const,
																newValue,
															);

															// Update correct answers if this option was previously selected
															const newQuestions = [...questions];
															const checkboxQuestion = newQuestions[
																questionIndex
															] as any;

															if (
																checkboxQuestion.correctAnswers.includes(
																	oldValue,
																)
															) {
																const updatedCorrectAnswers =
																	checkboxQuestion.correctAnswers
																		.filter((ans: string) => ans !== oldValue)
																		.concat(newValue);

																setValue(
																	`questions.${questionIndex}.correctAnswers` as const,
																	updatedCorrectAnswers,
																);
															}
														}}
													/>
													{(question as any).options.length > 2 && (
														<button
															type="button"
															onClick={() =>
																removeOption(questionIndex, optionIndex)
															}
															className="p-1 text-red-600 hover:text-red-800"
															aria-label="Remove option"
														>
															<Trash2 size={16} />
														</button>
													)}
												</div>
											),
										)}
										{errors.questions?.[questionIndex]?.options && (
											<p className="text-red-600 text-sm mt-1">
												{errors.questions[questionIndex]?.options?.message}
											</p>
										)}
										{errors.questions?.[questionIndex]?.correctAnswers && (
											<p className="text-red-600 text-sm mt-1">
												{
													errors.questions[questionIndex]?.correctAnswers
														?.message
												}
											</p>
										)}
										<button
											type="button"
											onClick={() => addOption(questionIndex)}
											className="mt-2 px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700"
										>
											<Plus size={16} className="inline mr-1" />
											Add Option
										</button>
									</div>
								</div>
							)}
						</div>
					))}

					{errors.questions && (
						<p className="text-red-600 text-sm mt-1">
							{errors.questions.message}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<div className="flex gap-4">
					<button
						type="submit"
						disabled={loading}
						className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Creating..." : "Create Quiz"}
					</button>
					<Link
						href="/quizzes"
						className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
					>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}
