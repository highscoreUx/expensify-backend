import { SchemaErrors } from "@/constants";
import { z } from "zod";

export const userSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(2, { message: `${SchemaErrors.firstName}` }),
	lastName: z
		.string()
		.trim()
		.min(2, { message: `${SchemaErrors.lastName}` }),
	password: z
		.string()
		.trim()
		.min(8, { message: `${SchemaErrors.password}` }),
	email: z.string().email().trim(),
	role: z.enum(["user", "admin"]).default("user"),
	verifiedAt: z.date().optional(),
	isSuspended: z.boolean().default(false),
});

export type TUser = z.infer<typeof userSchema>;
