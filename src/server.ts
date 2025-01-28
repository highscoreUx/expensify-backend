import { Express } from "express";
import { appFactoryImpl } from ".";

const port = process.env.PORT || 8000;
const startServer = async (app: Express) => {
	try {
		app.listen(port, () => {
			console.log(`Sever is listening on port`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

await startServer(appFactoryImpl());

process.on("SIGINT", () => {
	try {
		process.exit(0);
	} catch (error) {
		process.exit(1);
	}
});
