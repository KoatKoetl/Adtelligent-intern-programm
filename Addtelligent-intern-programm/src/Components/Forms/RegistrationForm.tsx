import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
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
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		defaultValues: {
			username: "",
			login: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(registerFormSchema),
	});

	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	const onSubmit = (data: RegisterFormData) => {
		console.log("Form submitted:", data.username, data.login);

		login({
			id: crypto.randomUUID(),
			username: data.username,
			email: data.login,
		});

		console.log("Registration successful!");
		const timer = setTimeout(() => {
			navigate("/news");
		}, 100);

		return () => clearTimeout(timer);
	};

	return (
		<CustomForm title="Registration" onSubmit={handleSubmit(onSubmit)}>
			<FormField
				id={"username"}
				label="Username"
				placeholder="Username"
				control={control}
				error={errors.username?.message}
				disabled={isSubmitting}
			/>

			<FormField
				id={"login"}
				label="Login"
				placeholder="Login"
				control={control}
				error={errors.login?.message}
				disabled={isSubmitting}
			/>

			<FormField
				id={"password"}
				label="Password"
				type="password"
				placeholder="••••••••"
				control={control}
				error={errors.password?.message}
				disabled={isSubmitting}
			/>

			<FormField
				id={"confirmPassword"}
				label="Confirm Password"
				type="password"
				placeholder="••••••••"
				control={control}
				error={errors.confirmPassword?.message}
				disabled={isSubmitting}
			/>

			<FormActions className="!mt-4">
				<DefaultButton type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Register"}
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
