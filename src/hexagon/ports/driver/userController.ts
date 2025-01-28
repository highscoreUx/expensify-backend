import { Request, Response } from "express";

export interface IUserController {
	signUp(req: Request, res: Response): Promise<void>;
}
