import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { useLogin } from "../../hooks/useAuth";
import DefaultButton from "../DefaultButton";
import CustomForm from "../Forms/Custom-form";
import FormActions from "./FormActions";
import FormField from "./FormField";

const loginFormSchema = z.object({
	login: z.string().min(1, "Login is required"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginFormData>({
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: zodResolver(loginFormSchema),
	});

	const loginMutation = useLogin();

	const onSubmit = (data: LoginFormData) => {
		loginMutation.mutate(data, {
			onError: (error: Error) => {
				if (error.message.includes("credentials")) {
					setError("password", { message: "Invalid credentials" });
				} else {
					setError("root", { message: error.message });
				}
			},
		});
	};

	return (
		<CustomForm title="Login" onSubmit={handleSubmit(onSubmit)}>
			<FormField
				id={"login"}
				label="Login"
				placeholder="Enter your login"
				control={control}
				error={errors.login?.message}
				disabled={loginMutation.isPending}
			/>

			<FormField
				id={"password"}
				label="Password"
				type="password"
				placeholder="••••••••"
				control={control}
				error={errors.password?.message}
				disabled={loginMutation.isPending}
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
					disabled={loginMutation.isPending}
				>
					{loginMutation.isPending ? "Logging in..." : "Log In"}
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
