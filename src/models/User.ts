import { SchemaErrors } from "@/constants";
import { TUser } from "@/utilities/Zod";
import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema<TUser & Document>({
	firstName: {
		type: String,
		minlength: [2, `${SchemaErrors.firstName.lengthError}`],
		required: [true, `${SchemaErrors.firstName.requiredError}`],
	},
	lastName: {
		type: String,
		minlength: [2, `${SchemaErrors.lastName.lengthError}`],
		required: [true, `${SchemaErrors.lastName.requiredError}`],
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		required: [true, `${SchemaErrors.email.requiredError}`],
	},
	password: {
		type: String,
		minlength: [2, `${SchemaErrors.password.lengthError}`],
		required: [true, `${SchemaErrors.password.requiredError}`],
	},
	isSuspended: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	verifiedAt: {
		type: Date,
	},
});

userSchema.index({ email: 1, _id: 1 });
const User = mongoose.model<TUser & Document>("User", userSchema);
export default User;
