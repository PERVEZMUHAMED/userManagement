import { Container } from "inversify";
import { TYPES } from "./TYPES";
import IUserRepository from "../repository/Interface/user.repository.interface";
import UserRepository from "../repository/user.repository";
import UserService from "../service/user.service";
import IUserService from "../service/Interface/user.service.interface";
import IUserController from "../controller/Interface/userController.interface";
import UserController from "../controller/userController";
import IAuthMiddleware from "../middleware/Interface/auth.middleware.interface";
import AuthMiddleware from "../middleware/authenticate";

const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserController>(TYPES.UserController).to(UserController);

container.bind<IAuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

export  const user = container.get<IUserController>(TYPES.UserController);
export const auth = container.get<IAuthMiddleware>(TYPES.AuthMiddleware)