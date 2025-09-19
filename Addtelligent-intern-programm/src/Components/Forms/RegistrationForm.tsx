import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useRegister } from "../../hooks/useAuth";
import {
	type RegisterFormData,
	registerFormSchema,
} from "../../zod/RegisterForm/registerForm.types";
import DefaultButton from "../DefaultButton";
import CustomForm from "./Custom-form";
import FormActions from "./FormActions";
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
		<CustomForm title="Registration" onSubmit={handleSubmit(onSubmit)}>
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

			<FormActions className="!mt-4">
				<DefaultButton
					type="submit"
					className="w-full"
					disabled={registerMutation.isPending}
				>
					{registerMutation.isPending ? "Registering..." : "Register"}
				</DefaultButton>

				<Link
					to="/login"
					className="inline-block mt-2 text-right w-full hover:underline underline-offset-2"
				>
					<span>Log in account</span>
				</Link>
			</FormActions>
		</CustomForm>
	);
};

export default RegisterForm;
