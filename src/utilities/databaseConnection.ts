import mongoose from "mongoose";

export const connectMongooseDb = async (URI: string) => {
	try {
		await mongoose.connect(URI);
		console.log("Database Connected");
	} catch (error) {
		console.log(error);
	}
};
