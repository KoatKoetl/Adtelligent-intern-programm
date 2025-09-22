import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useAuth";
import {
	type RegisterFormData,
	registerFormSchema,
} from "../../zod/RegisterForm/registerForm.types";
import CustomForm from "./Custom-form";
import FormField from "./FormField";

const formFields = [
	{ id: "username", label: "Username", placeholder: "Username" },
	{ id: "login", label: "Login", placeholder: "Login" },
	{
		id: "password",
		label: "Password",
		type: "password",
		placeholder: "••••••••",
	},
	{
		id: "confirmPassword",
		label: "Confirm Password",
		type: "password",
		placeholder: "••••••••",
	},
];

const RegisterForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<RegisterFormData>({
		defaultValues: {
			username: "",
			login: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(registerFormSchema),
	});

	const registerMutation = useRegister();

	const onSubmit = (data: RegisterFormData) => {
		registerMutation.mutate(data, {
			onError: (error: Error) => {
				if (error.message.includes("already exists")) {
					setError("login", { message: error.message });
				} else if (error.message.includes("Passwords")) {
					setError("confirmPassword", { message: error.message });
				} else {
					setError("root", { message: error.message });
				}
			},
		});
	};

	return (
		<CustomForm
			title="Registration"
			onSubmit={handleSubmit(onSubmit)}
			button={{
				text: "Register",
				loadingText: "Registering...",
				disabled: registerMutation.isPending,
				isLoading: registerMutation.isPending,
			}}
			link={{
				to: "/login",
				text: "Log in account",
			}}
			rootError={errors.root?.message}
		>
			{formFields.map((field) => (
				<FormField
					key={field.id}
					id={field.id as keyof RegisterFormData}
					label={field.label}
					placeholder={field.placeholder}
					type={field.type}
					control={control}
					error={errors[field.id as keyof RegisterFormData]?.message}
					disabled={registerMutation.isPending}
				/>
			))}

			{errors.root && (
				<div className="text-red-500 text-sm text-center">
					{errors.root.message}
				</div>
			)}
		</CustomForm>
	);
};

export default RegisterForm;
