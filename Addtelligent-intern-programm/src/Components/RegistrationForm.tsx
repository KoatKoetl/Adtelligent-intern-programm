import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import {
	type RegisterFormData,
	registerFormSchema,
} from "../zod/RegisterForm/registerForm.types";
import DefaultButton from "./DefaultButton";
import FormField from "./FormField";

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const login = useAuthStore((state) => state.login);

	const navigate = useNavigate();

	const onSubmit = (data: RegisterFormData) => {
		console.log("Form submitted:", data.username, data.email);

		login({
			id: crypto.randomUUID(),
			username: data.username,
			email: data.email,
		});

		console.log("Registration successful!");
		const timer = setTimeout(() => {
			navigate("/news");
		}, 100);

		return () => clearTimeout(timer);
	};

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-56px-70px)] px-4 md:px-0">
			<Card className="w-full max-w-md shadow-lg border-[#bf6629] gap-y-4 dark:!bg-dark-theme-100 light:!bg-white">
				<h1 className="text-center text-2xl py-2">Registration</h1>
				<CardContent className="px-4 md:px-6">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							id={"username"}
							label="Username"
							placeholder="Username"
							register={register}
							error={errors.username?.message}
							disabled={isSubmitting}
						/>

						<FormField
							id={"email"}
							label="Email"
							type="email"
							placeholder="email@example.com"
							register={register}
							error={errors.email?.message}
							disabled={isSubmitting}
						/>

						<FormField
							id={"password"}
							label="Password"
							type="password"
							placeholder="••••••••"
							register={register}
							error={errors.password?.message}
							disabled={isSubmitting}
						/>

						<FormField
							id={"confirmPassword"}
							label="Confirm Password"
							type="password"
							placeholder="••••••••"
							register={register}
							error={errors.confirmPassword?.message}
							disabled={isSubmitting}
						/>

						<DefaultButton
							type="submit"
							className="w-full !mt-4"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Submitting..." : "Register"}
						</DefaultButton>
						<Link
							to="/login"
							className="inline-block mt-2 text-right w-full hover:underline underline-offset-2"
						>
							<span>Log in account</span>
						</Link>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default RegisterForm;
