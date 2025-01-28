import { ValidationError } from "@/constants";
import { IUserRepository } from "@/hexagon/ports/driven/userRepository";
import { TUser } from "@/utilities/Zod";
import { Model } from "mongoose";

export class UserRepositoryImpl implements IUserRepository {
	private model: Model<TUser & Document>;

	constructor(model: Model<TUser & Document>) {
		this.model = model;
	}

	async createUser(data: TUser): Promise<TUser> {
		try {
			const createdUser = await this.model.create(data);
			return createdUser;
		} catch (error: any) {
			throw new ValidationError(`Error creating user: ${error.message}`);
		}
	}

	async updateUserByID(id: string, data: Partial<TUser>): Promise<TUser> {
		const { role, ...rest } = data;
		try {
			const updatedUser = await this.model.findByIdAndUpdate(id, rest, {
				new: true,
			});
			if (!updatedUser) {
				throw new ValidationError(`Please provide valid user ID`);
			}
			return updatedUser;
		} catch (error: any) {
			throw new ValidationError(
				`Error Updating user with ID: ${error.message}`,
			);
		}
	}

	async updateUserByEmail(email: string, data: Partial<TUser>): Promise<TUser> {
		try {
			const updatedUser = await this.model.findOneAndUpdate({ email }, data, {
				new: true,
			});
			if (!updatedUser) {
				throw new ValidationError(`Please provide valid user email`);
			}
			return updatedUser;
		} catch (error: any) {
			throw new ValidationError(
				`Error Updating user with Email: ${error.message}`,
			);
		}
	}

	async getUsers(
		data: Omit<TUser, "password"> = {} as Omit<TUser, "password">,
	) {
		try {
			const users = await this.model.find(data);

			return users;
		} catch (error: any) {
			throw new ValidationError(`Error finding users: ${error.message}`);
		}
	}

	async getUserByEmail(email: string): Promise<TUser> {
		try {
			const user = await this.model.findOne({ email });
			if (!user) {
				throw new ValidationError("please provide valid user email");
			}
			return user;
		} catch (error: any) {
			throw new ValidationError(
				`Error finding user by email: ${error.message}`,
			);
		}
	}

	async getUserById(id: string): Promise<TUser> {
		try {
			const user = await this.model.findById(id);
			if (!user) {
				throw new ValidationError("please provide valid user ID");
			}
			return user;
		} catch (error: any) {
			throw new ValidationError(`Error finding user by ID: ${error.message}`);
		}
	}

	async deleteUser(id: string) {
		try {
			await this.model.findByIdAndDelete(id);
		} catch (error: any) {
			throw new ValidationError(`Error deleting user: ${error.message}`);
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
			throw new ValidationError(`Error deleting users: ${error.message}`);
		}
	}
}
