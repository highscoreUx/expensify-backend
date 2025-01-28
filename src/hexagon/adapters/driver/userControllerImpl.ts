import { THttpStatus, ValidationError } from "@/constants";
import { IUserService } from "@/hexagon/core/userService";
import { IUserController } from "@/hexagon/ports/driver/userController";
import { Request, Response } from "express";

export class UserControllerImpl implements IUserController {
	private userService: IUserService;
	private httpStatus: THttpStatus;

	constructor(userService: IUserService, httpStatus: typeof this.httpStatus) {
		this.userService = userService;
		this.httpStatus = httpStatus;
	}

	async signUp(req: Request, res: Response): Promise<void> {
		try {
			const user = await this.userService.userSignUp(req.body);
			res
				.status(this.httpStatus.created)
				.json({ msg: "User sign up successful", user });
		} catch (error) {
			if (error instanceof ValidationError) {
				res.status(this.httpStatus.badRequest).json({ msg: error.message });
				return;
			}
			res
				.status(this.httpStatus.internalServerError)
				.json({ msg: "internal server error" });
		}
	}
}
