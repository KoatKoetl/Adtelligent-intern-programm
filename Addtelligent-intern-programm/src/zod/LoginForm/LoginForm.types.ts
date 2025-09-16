import { z } from "zod";

export const loginFormSchema = z.object({
	email: z
		.string()
		.nonempty({ message: "fieldRequired" })
		.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: "invalidEmail",
		}),
	password: z
		.string()
		.nonempty({ message: "fieldRequired" })
		.min(6, { message: "passwordTooShort" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
