import { z } from "zod";

export const registerFormSchema = z
	.object({
		username: z
			.string()
			.min(2, { message: "Username must be at least 2 characters" })
			.max(50, { message: "Username cannot exceed 50 characters" }),
		login: z
			.string()
			.nonempty({ message: "Login is required" })
			.min(3, { message: "Login must be at least 3 characters" })
			.max(50, { message: "Login cannot exceed 50 characters" }),
		password: z
			.string()
			.nonempty({ message: "Password is required" })
			.min(8, { message: "Password must be at least 8 characters" })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
				message: "Password must contain at least one letter and one number",
			}),
		confirmPassword: z
			.string()
			.nonempty({ message: "Please confirm your password" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
