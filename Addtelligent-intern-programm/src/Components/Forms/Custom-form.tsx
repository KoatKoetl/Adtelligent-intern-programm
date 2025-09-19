import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ReactNode } from "react";

interface CustomFormProps {
	title: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	children: ReactNode;
	className?: string;
}

const CustomForm = ({
	title,
	onSubmit,
	children,
	className = "",
}: CustomFormProps) => {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
			<Card
				className={`w-full max-w-md shadow-lg border-[#bf6629] gap-y-4 dark:!bg-dark-theme-100 light:!bg-white ${className}`}
			>
				<h1 className="text-center text-2xl py-2">{title}</h1>
				<CardContent className="px-4 md:px-6">
					<form onSubmit={onSubmit} className="space-y-4">
						{children}
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default CustomForm;
