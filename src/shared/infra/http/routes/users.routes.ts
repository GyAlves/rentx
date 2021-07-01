import { CreateUserController } from "@modules/users/UseCases/createUsers/CreateUserController";
import { Router } from "express";

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post("", createUserController.handle);

export { usersRouter }
