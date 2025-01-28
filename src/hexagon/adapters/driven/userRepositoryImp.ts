import { IUserRepository } from "@/hexagon/ports/driven/userRepository";
import User from "@/models/User";
import { TUser } from "@/utilities/Zod";

export class UserRepositoryImpl implements IUserRepository {
	async createUser(data: TUser) {
		try {
			const createdUser = await User.create(data);
			return createdUser;
		} catch (error: any) {
			throw new Error(`Error creating user: ${error.message}`);
		}
	}

	async updateUserByID(id: string, data: Partial<TUser>) {
		try {
			const createdUser = await User.findByIdAndUpdate(id, data, { new: true });
			return createdUser;
		} catch (error: any) {
			throw new Error(`Error Updating user with ID: ${error.message}`);
		}
	}

	async updateUserByEmail(email: string, data: Partial<TUser>) {
		try {
			const createdUser = await User.findOneAndUpdate({ email }, data, {
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
			const users = await User.find(data);
			return users;
		} catch (error: any) {
			throw new Error(`Error finding users: ${error.message}`);
		}
	}

	async getUserByEmail(email: string) {
		try {
			const user = await User.findOne({ email });
			return user;
		} catch (error: any) {
			throw new Error(`Error finding user by email: ${error.message}`);
		}
	}

	async getUserById(id: string) {
		try {
			const user = await User.findById(id);
			return user;
		} catch (error: any) {
			throw new Error(`Error finding user by ID: ${error.message}`);
		}
	}

	async deleteUser(id: string) {
		try {
			await User.findByIdAndDelete(id);
		} catch (error: any) {
			throw new Error(`Error deleting user: ${error.message}`);
		}
	}

	async deleteUsers(ids: string[]) {
		try {
			await User.deleteMany({
				_id: {
					$in: ids,
				},
			});
		} catch (error: any) {
			throw new Error(`Error deleting users: ${error.message}`);
		}
	}
}
