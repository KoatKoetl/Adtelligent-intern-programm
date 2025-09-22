import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useAuth";
import {
	type RegisterFormData,
	registerFormSchema,
} from "../../zod/RegisterForm/registerForm.types";
import CustomForm from "./Custom-form";
import FormField from "./FormField";

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
			<FormField
				id={"username"}
				label="Username"
				placeholder="Username"
				control={control}
				error={errors.username?.message}
				disabled={registerMutation.isPending}
			/>

			<FormField
				id={"login"}
				label="Login"
				placeholder="Login"
				control={control}
				error={errors.login?.message}
				disabled={registerMutation.isPending}
			/>

			<FormField
				id={"password"}
				label="Password"
				type="password"
				placeholder="••••••••"
				control={control}
				error={errors.password?.message}
				disabled={registerMutation.isPending}
			/>

			<FormField
				id={"confirmPassword"}
				label="Confirm Password"
				type="password"
				placeholder="••••••••"
				control={control}
				error={errors.confirmPassword?.message}
				disabled={registerMutation.isPending}
			/>

			{errors.root && (
				<div className="text-red-500 text-sm text-center">
					{errors.root.message}
				</div>
			)}
		</CustomForm>
	);
};

export default RegisterForm;
