import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../users/users.model";

interface JwtPayload {
	_id: string;
}

export const protectedRoute = async (req: Request<any>, res: Response, next: NextFunction) => {
	let token;
	try {
		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			const jwtSecret = process.env.JWT_SECRET as string;
			// Verify token
			const { _id } = jwt.verify(token, jwtSecret) as JwtPayload;

			// Get user from the token
			// const user = await User.findById(decoded.id).select("-password");
			const user = await User.findOne({ _id, "tokens.token": token });

			next();
		}
	} catch (error) {
		return res.status(401).json("Unauthorized");
	}

	if (!token) {
		res.status(401);
		return res.status(401).json("Unauthorized no token");
	}
};
