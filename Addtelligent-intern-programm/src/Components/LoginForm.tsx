import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import {
	type LoginFormData,
	loginFormSchema,
} from "../zod/LoginForm/LoginForm.types";
import DefaultButton from "./DefaultButton";
import FormField from "./FormField";

const LoginForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginFormSchema),
	});

	const login = useAuthStore((state) => state.login);

	const navigate = useNavigate();

	const onSubmit = (data: LoginFormData) => {
		console.log("Form submitted:", data.email);

		login({
			id: crypto.randomUUID(),
			email: data.email,
		});

		// Logic for logging in
		console.log("Login successful!");

		const timer = setTimeout(() => {
			navigate("/news");
		}, 100);

		return () => clearTimeout(timer);
	};

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
			<Card className="w-full max-w-md shadow-lg border-[#bf6629] gap-y-4 dark:!bg-dark-theme-100 light:!bg-white">
				<h1 className="text-center text-2xl py-2">Log in</h1>
				<CardContent className="px-4 md:px-6">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							id={"email"}
							label="Email"
							type="email"
							placeholder="email@example.com"
							control={control}
							error={errors.email?.message}
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

						<DefaultButton
							type="submit"
							className="w-full !mt-4"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Submitting..." : "Log in"}
						</DefaultButton>

						<Link
							to="/register"
							className="inline-block mt-2 text-right w-full hover:underline underline-offset-2"
						>
							<span>Create an account</span>
						</Link>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginForm;
