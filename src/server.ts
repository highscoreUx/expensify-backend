import { Express } from "express";
import { appFactoryImpl } from ".";
import { connectMongooseDb } from "./utilities/databaseConnection";
import { configDotenv } from "dotenv";

configDotenv();
const port = process.env.PORT || 8000;
const startServer = async (
	app: Express,
	connectDB: (URI: string) => Promise<void>,
	URI: string,
) => {
	try {
		await connectDB(URI);
		app.listen(port, () => {
			console.log(`Sever is listening on port`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

await startServer(appFactoryImpl(), connectMongooseDb, process.env.DB_URL!);

process.on("SIGINT", () => {
	try {
		process.exit(0);
	} catch (error) {
		process.exit(1);
	}
});
