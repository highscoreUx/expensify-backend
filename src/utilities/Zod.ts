import { SchemaErrors } from "@/constants";
import { z } from "zod";

export const userSchema = z.object({
	firstName: z
		.string({ required_error: "Please provide your first name" })
		.trim()
		.min(2, { message: `${SchemaErrors.firstName.lengthError}` }),
	lastName: z
		.string({ required_error: "Please provide your last name" })
		.trim()
		.min(2, { message: `${SchemaErrors.lastName.lengthError}` }),
	password: z
		.string({ message: "Please provide a password" })
		.trim()
		.min(8, { message: `${SchemaErrors.password.lengthError}` }),
	email: z.string({ required_error: "Please provide an email" }).email().trim(),
	role: z.enum(["user", "admin"]).default("user"),
	verifiedAt: z.date().optional(),
	isSuspended: z.boolean().default(false),
});

export type TUser = z.infer<typeof userSchema>;
