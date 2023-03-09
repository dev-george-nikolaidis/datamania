import { z } from "zod";

export const userRegisterSchema = z.object({
	body: z.object({
		name: z
			.string({
				required_error: "Full name is required",
			})
			.min(1),
		email: z
			.string({
				required_error: "Email is required",
			})
			.email("Not a valid email"),
		password: z.string({ required_error: "Password is required" }).min(6),
	}),
});
