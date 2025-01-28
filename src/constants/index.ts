export const SchemaErrors = {
	firstName: {
		lengthError: "First name cannot be less than 2 characters",
		requiredError: "Please provide first name",
	},
	lastName: {
		lengthError: "Last name cannot be less than 2 characters",
		requiredError: "Please provide last name",
	},
	email: {
		requiredError: "Please provide an email",
	},
	password: {
		lengthError: "Password cannot be less than 8 characters",
		requiredError: "Please provide password",
	},
};

export const httpStatus = {
	created: 201,
	ok: 200,
	badRequest: 400,
	forbidden: 403,
	unauthorized: 401,
	internalServerError: 500,
};

export type THttpStatus = typeof httpStatus;

export class ValidationError extends Error {}
