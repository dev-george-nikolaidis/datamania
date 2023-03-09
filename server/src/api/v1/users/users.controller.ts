import { NextFunction, Request, Response } from "express";
import { loginUserPayload, registerUserPayload } from "./users.interfaces";
import { User } from "./users.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// @desc    get  user
// @route   GET /api/v1/users/login
// @access  public
export async function loginUser(req: Request<{}, never, loginUserPayload>, res: Response, next: NextFunction) {
	const { email, password } = req.body;

	try {
		// Check for user email
		const user = await User.findOne({ email: email });
		if (user && (await bcrypt.compare(password, user.password))) {
			res.json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).send("Invalid credentials");
		}
	} catch (error) {
		next(error);
	}
}

// @desc    create  user
// @route   POST /api/v1/users/register
// @access  Private
export async function registerUser(req: Request<{}, never, registerUserPayload>, res: Response, next: NextFunction) {
	const { name, email, password } = req.body;
	try {
		// check if the user exists
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			res.status(401).send("User already exists");
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const self = await User.create({
			name: name,
			email: email,
			password: hashedPassword,
		});

		res.status(200).json(self);
	} catch (error) {
		next(error);
	}
}

// Generate JWT
const generateToken = (id: any) => {
	const jwtSecret = process.env.JWT_SECRET as string;
	const jwtExpTime = process.env.JWT_TOKEN_EXPIRATION || 1;
	return jwt.sign({ id }, jwtSecret, {
		expiresIn: `${jwtExpTime}d`,
	});
};
