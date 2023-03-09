import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import db from "./config/db";
import { errorHandler } from "./middlewares/error-handler";
import { notFound } from "./middlewares/not-found";
import api from "./index-routes";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(
	cors({
		origin: "*",
	})
);

app.use(express.json());
db();

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Listening: http://localhost:${port}`);
});
