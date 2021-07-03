import upload from "@config/upload";
import { CreateUserController } from "@modules/users/UseCases/createUsers/CreateUserController";
import { DeleteUserByIdController } from "@modules/users/UseCases/deleteUserByID/DeleteUserByIdController";
import { ListUserByIdController } from "@modules/users/UseCases/listUserByID/ListUserByIdController";
import { ListUsersController } from "@modules/users/UseCases/listUsers/ListUsersController";
import { UpdateUserAvatarController } from "@modules/users/UseCases/updateUserAvatarUseCase/UpdateUserAvatarController";
import { UpdateUserController } from "@modules/users/UseCases/updateUsers/UpdateUserController";
import { Router } from "express";
import multer from "multer";

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const listUserByIdController = new ListUserByIdController()
const updateUserController = new UpdateUserController();
const deleteUseByIdController = new DeleteUserByIdController();
const updateUserAvatarController = new UpdateUserAvatarController();


const uploadAvatar = multer(upload.upload("./tmp/avatar"))

usersRouter.post("", createUserController.handle);
usersRouter.get("", listUsersController.handle);
usersRouter.get("/:user_id", listUserByIdController.handle);
usersRouter.put("/:user_id/update", updateUserController.handle);
usersRouter.delete("/:user_id", deleteUseByIdController.handle);
usersRouter.patch("/:user_id/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRouter }
