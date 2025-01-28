import { httpStatus } from "@/constants";
import { UserRepositoryImpl } from "@/hexagon/adapters/driven/userRepositoryImp";
import { UserControllerImpl } from "@/hexagon/adapters/driver/userControllerImpl";
import { UserServiceImpl } from "@/hexagon/core/userServiceImpl";
import User from "@/models/User";
import { TUser } from "@/utilities/Zod";
import Router from "express";
import { Model } from "mongoose";

const router = Router();

const userRepository = new UserRepositoryImpl(
	User as unknown as Model<TUser & Document>,
);
const userService = new UserServiceImpl(userRepository);
const userController = new UserControllerImpl(userService, httpStatus);

router.post("/", userController.signUp);

export default router;
