import { Button, type ButtonProps } from "@mui/material";
import type { ReactNode } from "react";

interface DefaultButtonProps extends ButtonProps {
	children: ReactNode;
}

const DefaultButton = ({ children, ...props }: DefaultButtonProps) => {
	return (
		<Button
			{...props}
			variant="contained"
			className="dark:!bg-dark-theme-500 dark:hover:!bg-dark-theme-600"
		>
			{children}
		</Button>
	);
};

export default DefaultButton;
