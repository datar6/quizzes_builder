// frontend/src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-16">
				{/* Hero Section */}
				<div className="text-center max-w-3xl mx-auto">
					<h1 className="text-5xl font-bold text-gray-900 mb-6">
						Welcome to Quiz Builder
					</h1>
					<p className="text-xl text-gray-600 mb-10">
						Create amazing quizzes with multiple question types. Perfect for
						educators, trainers, and anyone who loves to test knowledge.
					</p>

					{/* Features Grid */}
					<div className="grid md:grid-cols-3 gap-8 mb-12">
						<div className="bg-white p-6 rounded-lg shadow-sm">
							<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
								<span className="text-2xl">✓</span>
							</div>
							<h3 className="font-semibold mb-2">Multiple Question Types</h3>
							<p className="text-gray-600 text-sm">
								Boolean, Input, and Checkbox questions supported
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-sm">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
								<span className="text-2xl">⚡</span>
							</div>
							<h3 className="font-semibold mb-2">Easy to Use</h3>
							<p className="text-gray-600 text-sm">
								Intuitive interface for creating and managing quizzes
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-sm">
							<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
								<span className="text-2xl">🎯</span>
							</div>
							<h3 className="font-semibold mb-2">Professional</h3>
							<p className="text-gray-600 text-sm">
								Built with modern technologies and best practices
							</p>
						</div>
					</div>

					{/* CTA Buttons */}
					<div className="flex gap-4 justify-center">
						<Link
							href="/quizzes"
							className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
						>
							View All Quizzes
						</Link>
						<Link
							href="/create"
							className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
						>
							Create New Quiz
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
