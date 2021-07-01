import { CreateUserController } from "@modules/users/UseCases/createUsers/CreateUserController";
import { ListUsersController } from "@modules/users/UseCases/listUsers/ListUsersController";
import { Router } from "express";

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRouter.post("", createUserController.handle);
usersRouter.get("", listUsersController.handle);

export { usersRouter }
