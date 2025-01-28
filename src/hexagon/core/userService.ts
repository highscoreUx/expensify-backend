import { TUser } from "@/utilities/Zod";

export interface IUserService {
	userSignUp(data: unknown): Promise<TUser>;
	userLogin(data: unknown): Promise<TUser>;
	userProfileUpdate(id: string, data: unknown): Promise<TUser>;
	userAccountDelete(id: string): Promise<void>;
}
