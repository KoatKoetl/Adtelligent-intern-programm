import { z } from "zod";

export const loginFormSchema = z.object({
	login: z
		.string()
		.nonempty({ message: "fieldRequired" })
		.min(3, { message: "loginTooShort" }),
	password: z
		.string()
		.nonempty({ message: "fieldRequired" })
		.min(6, { message: "passwordTooShort" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
