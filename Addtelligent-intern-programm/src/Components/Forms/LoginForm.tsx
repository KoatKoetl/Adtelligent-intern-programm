import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../../hooks/useAuth";
import CustomForm from "../Forms/Custom-form";
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
		<CustomForm
			title="Login"
			onSubmit={handleSubmit(onSubmit)}
			className=""
			button={{
				text: "Log In",
				loadingText: "Logging in...",
				disabled: loginMutation.isPending,
				isLoading: loginMutation.isPending,
			}}
			link={{
				to: "/register",
				text: "Create an account",
			}}
			rootError={errors.root?.message}
		>
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
		</CustomForm>
	);
};

export default LoginForm;
