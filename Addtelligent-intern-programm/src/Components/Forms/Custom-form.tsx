import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ReactNode } from "react";
import { Link } from "react-router";
import DefaultButton from "../DefaultButton";
import FormActions from "./FormActions";

interface ButtonConfig {
	text: string;
	loadingText?: string;
	className?: string;
	disabled?: boolean;
	isLoading?: boolean;
}

interface LinkConfig {
	to: string;
	text: string;
	className?: string;
}

interface CustomFormProps {
	title: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	children: ReactNode;
	className?: string;
	button: ButtonConfig;
	link?: LinkConfig;
	rootError?: string;
}

const CustomForm = ({
	title,
	onSubmit,
	children,
	className = "",
	button,
	link,
	rootError,
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

						{rootError && (
							<div className="text-red-500 text-sm text-center">
								{rootError}
							</div>
						)}

						<FormActions className="!mt-4">
							<DefaultButton
								type="submit"
								className={`w-full ${button.className || ""}`}
								disabled={button.disabled || button.isLoading}
							>
								{button.isLoading
									? button.loadingText || button.text
									: button.text}
							</DefaultButton>

							{link && (
								<Link
									to={link.to}
									className={`inline-block mt-2 text-right w-full hover:underline underline-offset-2 ${link.className || ""}`}
								>
									<span>{link.text}</span>
								</Link>
							)}
						</FormActions>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default CustomForm;
