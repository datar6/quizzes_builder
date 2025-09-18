import { z } from "zod";

// Base question schema with all possible fields as optional
const baseQuestionSchema = z.object({
	id: z.string(),
	type: z.enum(["boolean", "input", "checkbox"]),
	question: z.string().min(1, "Question is required"),
	// Make all answer fields optional initially
	correctAnswer: z.union([z.boolean(), z.string()]).optional(),
	options: z.array(z.string()).optional(),
	correctAnswers: z.array(z.string()).optional(),
});

// Custom refinement function to validate based on question type
export const questionSchema = baseQuestionSchema.refine(
	(data) => {
		if (data.type === "boolean") {
			return typeof data.correctAnswer === "boolean";
		}
		if (data.type === "input") {
			return (
				typeof data.correctAnswer === "string" && data.correctAnswer.length > 0
			);
		}
		if (data.type === "checkbox") {
			return (
				Array.isArray(data.options) &&
				data.options.length >= 2 &&
				data.options.every(
					(option) => typeof option === "string" && option.length > 0,
				) &&
				Array.isArray(data.correctAnswers) &&
				data.correctAnswers.length >= 1
			);
		}
		return false;
	},
	{
		message: "Invalid question configuration for the selected type",
		path: ["correctAnswer"], // This will show the error on the correctAnswer field
	},
);

export const createQuizSchema = z.object({
	title: z.string().min(1, "Title is required"),
	questions: z
		.array(questionSchema)
		.min(1, "At least one question is required"),
});

export type CreateQuizFormData = z.infer<typeof createQuizSchema>;

// Alternative approach using transform (if you prefer):
export const questionSchemaWithTransform = z
	.object({
		id: z.string(),
		type: z.enum(["boolean", "input", "checkbox"]),
		question: z.string().min(1, "Question is required"),
		correctAnswer: z.union([z.boolean(), z.string()]).optional(),
		options: z.array(z.string()).optional(),
		correctAnswers: z.array(z.string()).optional(),
	})
	.transform((data) => {
		// Ensure the data structure is correct based on type
		if (data.type === "boolean") {
			return {
				...data,
				correctAnswer: data.correctAnswer as boolean,
			};
		}
		if (data.type === "input") {
			return {
				...data,
				correctAnswer: data.correctAnswer as string,
			};
		}
		if (data.type === "checkbox") {
			return {
				...data,
				options: data.options || [],
				correctAnswers: data.correctAnswers || [],
			};
		}
		return data;
	})
	.refine(
		(data) => {
			if (data.type === "boolean") {
				return typeof data.correctAnswer === "boolean";
			}
			if (data.type === "input") {
				return (
					typeof data.correctAnswer === "string" &&
					data.correctAnswer.length > 0
				);
			}
			if (data.type === "checkbox") {
				return (
					Array.isArray(data.options) &&
					data.options.length >= 2 &&
					data.options.every(
						(option) => typeof option === "string" && option.length > 0,
					) &&
					Array.isArray(data.correctAnswers) &&
					data.correctAnswers.length >= 1
				);
			}
			return false;
		},
		{
			message: "Invalid question configuration",
		},
	);

// Even simpler approach - just use a flexible schema:
export const simpleQuestionSchema = z.object({
	id: z.string(),
	type: z.enum(["boolean", "input", "checkbox"]),
	question: z.string().min(1, "Question is required"),
	correctAnswer: z.union([z.boolean(), z.string()]).optional(),
	options: z.array(z.string()).optional(),
	correctAnswers: z.array(z.string()).optional(),
});

export const simpleCreateQuizSchema = z.object({
	title: z.string().min(1, "Title is required"),
	questions: z
		.array(simpleQuestionSchema)
		.min(1, "At least one question is required"),
});

export type SimpleCreateQuizFormData = z.infer<typeof simpleCreateQuizSchema>;
