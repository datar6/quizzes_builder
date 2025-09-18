export type QuestionType = "boolean" | "input" | "checkbox";

export interface QuestionBase {
	id: string;
	type: QuestionType;
	question: string;
}

export interface BooleanQuestion extends QuestionBase {
	type: "boolean";
	correctAnswer: boolean;
}

export interface InputQuestion extends QuestionBase {
	type: "input";
	correctAnswer: string;
}

export interface CheckboxQuestion extends QuestionBase {
	type: "checkbox";
	options: string[];
	correctAnswers: string[];
}

export type Question = BooleanQuestion | InputQuestion | CheckboxQuestion;

export interface Quiz {
	id: string;
	title: string;
	questions: Question[];
	createdAt: string;
	updatedAt: string;
}

export interface QuizListItem {
	id: string;
	title: string;
	questionsCount: number;
	createdAt: string;
}

export interface CreateQuizRequest {
	title: string;
	questions: Question[];
}
