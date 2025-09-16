import { z } from "zod";

export const registerFormSchema = z
	.object({
		username: z
			.string()
			.min(2, { message: "Username must be at least 2 characters" })
			.max(50, { message: "Username cannot exceed 50 characters" }),
		email: z
			.string()
			.nonempty({ message: "Email is required" })
			.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
				message: "Email is invalid",
			}),
		password: z
			.string()
			.nonempty({ message: "Password is required" })
			.min(6, { message: "Password must be at least 6 characters" }),
		confirmPassword: z
			.string()
			.nonempty({ message: "Please confirm your password" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
