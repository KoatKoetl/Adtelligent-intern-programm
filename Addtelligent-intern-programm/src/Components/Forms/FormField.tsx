import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
	id: Path<T>;
	label: string;
	type?: string;
	placeholder?: string;
	control: Control<T>;
	error?: string;
	disabled?: boolean;
}

const FormField = <T extends FieldValues>({
	id,
	label,
	type = "text",
	placeholder,
	control,
	error,
	disabled,
}: FormFieldProps<T>) => {
	return (
		<div className="mb-1">
			<div className="flex items-center">
				<FormLabel className="flex-1" htmlFor={id}>
					{label}
				</FormLabel>
				<Controller
					name={id}
					control={control}
					render={({ field }) => (
						<Input
							id={id}
							type={type}
							placeholder={placeholder}
							{...field}
							disabled={disabled}
							className="flex-1/2"
						/>
					)}
				/>
			</div>
			<p className="text-red-500 text-sm min-h-5">{error}</p>
		</div>
	);
};

export default FormField;
