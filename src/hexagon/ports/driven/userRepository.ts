import { TUser } from "@/utilities/Zod";

export interface IUserRepository {
	createUser(data: TUser): Promise<TUser>;
	updateUserByID(id: string, data: Partial<TUser>): Promise<TUser | null>;
	updateUserByEmail(email: string, data: Partial<TUser>): Promise<TUser | null>;
	getUsers(data?: Omit<TUser, "password">): Promise<TUser[]>;
	getUserByEmail(email: string): Promise<TUser | null>;
	getUserById(id: string): Promise<TUser | null>;
	deleteUser(id: string): Promise<void>;
	deleteUsers(ids: string[]): Promise<void>;
}
