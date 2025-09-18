"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
	onDelete: () => Promise<void>;
	confirmMessage?: string;
}

export default function DeleteButton({
	onDelete,
	confirmMessage = "Are you sure?",
}: DeleteButtonProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		if (!confirm(confirmMessage)) return;

		setIsDeleting(true);
		try {
			await onDelete();
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<button
			type="button"
			onClick={handleDelete}
			disabled={isDeleting}
			className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
			title="Delete quiz"
		>
			<Trash2 size={18} />
		</button>
	);
}
