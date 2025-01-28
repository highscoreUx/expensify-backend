import express from "express";
import helmet from "helmet";
import { userRouter } from "./routes";

export const appFactoryImpl = () => {
	const app = express();

	app.disable("x-powered-by");
	app.use(express.json({ limit: "100kb" }));
	app.use(helmet());

	app.use("/api/v1/auth", userRouter);

	return app;
};
