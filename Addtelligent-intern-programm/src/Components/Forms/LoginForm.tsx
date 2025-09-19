import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { loginFormSchema } from "../../zod/LoginForm/LoginForm.types";
import DefaultButton from "../DefaultButton";
import CustomForm from "./Custom-form";
import FormActions from "./FormActions";
import FormField from "./FormField";

interface LoginFormData {
	login: string;
	password: string;
}

const LoginForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: zodResolver(loginFormSchema),
	});

	const navigate = useNavigate();

	const onSubmit = (data: LoginFormData) => {
		console.log("Login submitted:", data);

		const timer = setTimeout(() => {
			navigate("/news");
		}, 100);

		return () => clearTimeout(timer);
	};

	return (
		<CustomForm title="Login" onSubmit={handleSubmit(onSubmit)}>
			<FormField
				id={"login"}
				label="Login"
				placeholder="Enter your login"
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

			<FormActions className="!mt-4">
				<DefaultButton type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? "Logging in..." : "Log In"}
				</DefaultButton>

				<Link
					to="/register"
					className="inline-block mt-2 text-center w-full hover:underline underline-offset-2"
				>
					<span>Create an account</span>
				</Link>
			</FormActions>
		</CustomForm>
	);
};

export default LoginForm;
