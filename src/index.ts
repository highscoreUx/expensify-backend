import express from "express";
import helmet from "helmet";

export const appFactoryImpl = () => {
	const app = express();

	app.disable("x-powered-by");
	app.use(express.json({ limit: "100kb" }));
	app.use(helmet());

	return app;
};
