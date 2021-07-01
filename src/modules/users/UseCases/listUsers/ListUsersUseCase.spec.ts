import { ICreateUserDTO } from "../../../../modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../../modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUsers/CreateUserUseCase";
import { ListUsersUseCase } from "./ListUsersUseCase"

let listUsersUseCase: ListUsersUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("List Users", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to list all users", async () => {
        const user1: ICreateUserDTO = {
            name: 'test1',
            email: 'teste@example.com',
            password: '55588899',
            driver_license: 'driver_license',
        };

        const user2: ICreateUserDTO = {
            name: 'test1',
            email: 'teste1@example.com',
            password: '55588888',
            driver_license: 'driver_license',
        };

        await createUserUseCase.execute(user1);
        await createUserUseCase.execute(user2);

        const users = await listUsersUseCase.execute();
        expect(users.length).toBeGreaterThan(0)
    })
})
