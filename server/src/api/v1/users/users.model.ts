import { Schema, model } from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
	role: string;
}

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, default: "user" },
	},
	{
		timestamps: true,
	}
);

export const User = model<IUser>("User", userSchema);
