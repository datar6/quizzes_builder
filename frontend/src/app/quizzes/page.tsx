import QuizList from "@/components/QuizList";

export default function QuizzesPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center mb-8">Quiz Builder</h1>
			<QuizList />
		</div>
	);
}
