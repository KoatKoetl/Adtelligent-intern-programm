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
				switch (true) {
					case error.message.includes("already exists"):
						setError("login", { message: error.message });
						break;
					case error.message.includes("Passwords"):
						setError("confirmPassword", { message: error.message });
						break;
					case error.message.includes("must match pattern"):
						setError("password", {
							message:
								"Password must be at least 8 characters long and contain at least one letter and one number",
						});
						break;
					default:
						setError("root", { message: error.message });
						break;
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
		</CustomForm>
	);
};

export default RegisterForm;
