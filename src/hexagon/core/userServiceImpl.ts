import { TUser, userSchema } from "@/utilities/Zod";
import { IUserRepository } from "../ports/driven/userRepository";
import { IUserService } from "./userService";
import { ValidationError } from "@/constants";

export class UserService implements IUserService {
	private userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async userSignUp(data: unknown) {
		const { success, error, data: typedUser } = userSchema.safeParse(data);

		if (!success) {
			throw new ValidationError(
				`Error signing up user : ${error.errors[0].message}`,
			);
		}

		const { role, ...rest } = typedUser;

		return this.userRepository.createUser({ ...rest, role: "user" });
	}

	async userLogin(data: unknown): Promise<TUser> {
		const {
			success,
			error,
			data: ParsedData,
		} = userSchema.partial().safeParse(data);

		if (!success) {
			throw new ValidationError(
				`error logging in user: ${error.errors[0].message}`,
			);
		}

		const { email } = ParsedData;

		const foundUser = await this.userRepository.getUserByEmail(email!);

		if (foundUser?.isSuspended) {
			throw new ValidationError(`can't log in now, because you're suspended`);
		}

		if (foundUser?.verifiedAt === null) {
			throw new ValidationError(
				`Please verify your account before you can login`,
			);
		}

		return foundUser!;
	}

	async userAccountDelete(id: string): Promise<void> {
		await this.userRepository.deleteUser(id);
		return;
	}

	async userProfileUpdate(id: string, data: unknown): Promise<TUser> {
		const {
			success,
			data: datum,
			error,
		} = userSchema.partial().safeParse(data);

		if (!success) {
			throw new ValidationError(
				`Error updating user profile : ${error.errors[0].message}`,
			);
		}

		return this.userRepository.updateUserByID(id, datum) as Promise<TUser>;
	}
}
