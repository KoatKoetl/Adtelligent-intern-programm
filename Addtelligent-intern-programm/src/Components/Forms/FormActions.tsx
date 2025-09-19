import type { ReactNode } from "react";

interface FormActionsProps {
	children: ReactNode;
	className?: string;
}

const FormActions = ({ children, className = "" }: FormActionsProps) => {
	return <div className={`space-y-2 ${className}`}>{children}</div>;
};

export default FormActions;
