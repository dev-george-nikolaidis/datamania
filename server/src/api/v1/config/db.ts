import mongoose from "mongoose";
import pgPool from "pg";

export const mongooseDB = async function db() {
	try {
		const connString = process.env.MANGO_URI || "";
		const conn = await mongoose.connect(connString);
		// Establish and verify connection

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (e) {
		console.log("could not connect");
	}
};

export const pool = new pgPool.Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: Number(process.env.PG_PORT),
});
