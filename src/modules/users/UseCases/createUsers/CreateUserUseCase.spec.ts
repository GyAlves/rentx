import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { AppError } from "../../../../shared/errors/AppError";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("should be able to create a new user", async () => {
        const user: ICreateUserDTO = {
            name: "user",
            email: "user@example.com.br",
            password: "password",
            driver_license: "driver_licence"
        }

        await createUserUseCase.execute(user);
        const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

        expect(userCreated).toHaveProperty("id");

    });

    it('should not be able to create a user with existing e-mail', async () => {
        await expect(async () => {
            const user1: ICreateUserDTO = {
                name: 'test1',
                email: 'teste@example.com',
                password: '55588899',
                driver_license: 'driver_license',
            };

            const user2: ICreateUserDTO = {
                name: 'test1',
                email: 'teste@example.com',
                password: '55588888',
                driver_license: 'driver_license',
            };

            await createUserUseCase.execute(user1);
            await createUserUseCase.execute(user2);
        }).rejects.toBeInstanceOf(AppError)
    });
})
