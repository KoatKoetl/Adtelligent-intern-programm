import { Button, type ButtonProps } from "@mui/material";
import clsx from "clsx";
import type { ReactNode } from "react";

interface DefaultButtonProps extends ButtonProps {
	children: ReactNode;
	className?: string;
}

const DefaultButton = ({
	children,
	className,
	...props
}: DefaultButtonProps) => {
	return (
		<Button
			{...props}
			variant="contained"
			className={clsx(
				"dark:!bg-dark-theme-500 dark:hover:!bg-dark-theme-600",
				className,
			)}
		>
			{children}
		</Button>
	);
};

export default DefaultButton;
