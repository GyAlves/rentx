import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../../modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../../modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUsers/CreateUserUseCase";
import { UpdateUsersUseCase } from "./UpdateUserUseCase";
import { ListUserByIdUseCase } from "../listUserByID/ListUserByIdUseCase";

let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUsersUseCase;
let listUserByIdUseCase: ListUserByIdUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Update User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        updateUserUseCase = new UpdateUsersUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        listUserByIdUseCase = new ListUserByIdUseCase(usersRepositoryInMemory)
    })

    it("should be able to update a user", async () => {
        const user: ICreateUserDTO = {
            name: 'test1',
            email: 'teste@example.com',
            password: '55588899',
            driver_license: 'driver_license',
        };

        const response = await createUserUseCase.execute(user);

        const findUser = await usersRepositoryInMemory.findById(response.id)

        const newName = "JohnDoe"

        const updatedUser = await updateUserUseCase.execute({ user_id: findUser.id, name: newName });

        expect(updatedUser).toHaveProperty("id")

    })

    it("should not be able to update un-existent user", async () => {
        await expect(async () => {
            await usersRepositoryInMemory.findById("id")
            await updateUserUseCase.execute({ user_id: "id", name: "example" })
        }).rejects.toBeInstanceOf(AppError);
    })
})
