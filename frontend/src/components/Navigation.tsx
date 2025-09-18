// frontend/src/components/Navigation.tsx
"use client";

import { Home, List, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	return (
		<nav className="bg-white shadow-sm border-b">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center gap-2 text-xl font-bold text-blue-600"
					>
						<span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
							Q
						</span>
						Quiz Builder
					</Link>

					{/* Navigation Links */}
					<div className="flex items-center gap-4">
						<Link
							href="/"
							className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
								isActive("/")
									? "bg-blue-100 text-blue-700"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							<Home size={18} />
							Home
						</Link>

						<Link
							href="/quizzes"
							className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
								isActive("/quizzes")
									? "bg-blue-100 text-blue-700"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							<List size={18} />
							Quizzes
						</Link>

						<Link
							href="/create"
							className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
								isActive("/create")
									? "bg-blue-100 text-blue-700"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							<Plus size={18} />
							Create
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
