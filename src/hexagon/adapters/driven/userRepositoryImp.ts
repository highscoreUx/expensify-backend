import { IUserRepository } from "@/hexagon/ports/driven/userRepository";
import { TUser } from "@/utilities/Zod";
import { Model } from "mongoose";

export class UserRepositoryImpl implements IUserRepository {
	private model: Model<TUser>;

	constructor(model: Model<TUser>) {
		this.model = model;
	}

	async createUser(data: TUser) {
		try {
			const createdUser = await this.model.create(data);
			return createdUser;
		} catch (error: any) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}

	async updateUserByID(id: string, data: Partial<TUser>) {
		try {
			const createdUser = await this.model.findByIdAndUpdate(id, data, {
				new: true,
			});
			return createdUser;
		} catch (error: any) {
			throw new Error(`Error Updating user with ID: ${error.message}`);
		}
	}

	async updateUserByEmail(email: string, data: Partial<TUser>) {
		try {
			const createdUser = await this.model.findOneAndUpdate({ email }, data, {
				new: true,
			});
			return createdUser;
		} catch (error: any) {
			throw new Error(`Error Updating user with Email: ${error.message}`);
		}
	}

	async getUsers(
		data: Omit<TUser, "password"> = {} as Omit<TUser, "password">,
	) {
		try {
			const users = await this.model.find(data);
			return users;
		} catch (error: any) {
			throw new Error(`Error finding users: ${error.message}`);
		}
	}

	async getUserByEmail(email: string) {
		try {
			const user = await this.model.findOne({ email });
			return user;
		} catch (error: any) {
			throw new Error(`Error finding user by email: ${error.message}`);
		}
	}

	async getUserById(id: string) {
		try {
			const user = await this.model.findById(id);
			return user;
		} catch (error: any) {
			throw new Error(`Error finding user by ID: ${error.message}`);
		}
	}

	async deleteUser(id: string) {
		try {
			await this.model.findByIdAndDelete(id);
		} catch (error: any) {
			throw new Error(`Error deleting user: ${error.message}`);
		}
	}

	async deleteUsers(ids: string[]) {
		try {
			await this.model.deleteMany({
				_id: {
					$in: ids,
				},
			});
		} catch (error: any) {
			throw new Error(`Error deleting users: ${error.message}`);
		}
	}
}
