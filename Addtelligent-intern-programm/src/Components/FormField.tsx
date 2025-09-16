import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import type { Path, UseFormRegister } from "react-hook-form";

interface FormFieldProps<T extends Record<string, unknown>> {
	id: Path<T>;
	label: string;
	type?: string;
	placeholder?: string;
	register: UseFormRegister<T>;
	error?: string;
	disabled?: boolean;
}

const FormField = <T extends Record<string, unknown>>({
	id,
	label,
	type = "text",
	placeholder,
	register,
	error,
	disabled,
}: FormFieldProps<T>) => (
	<div className="mb-1">
		<div className="flex items-center">
			<FormLabel className="flex-1" htmlFor={id}>
				{label}
			</FormLabel>
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				{...register(id)}
				disabled={disabled}
				className="flex-1/2"
			/>
		</div>
		<p className="text-red-500 text-sm min-h-5">{error}</p>
	</div>
);

export default FormField;
