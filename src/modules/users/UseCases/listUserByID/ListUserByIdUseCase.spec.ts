import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../../modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../../modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUsers/CreateUserUseCase";
import { ListUserByIdUseCase } from "./ListUserByIdUseCase";

let usersRepository: UsersRepositoryInMemory;
let listUserByUseCase: ListUserByIdUseCase;
let createUserUseCase: CreateUserUseCase;

describe("List an user by ID", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        listUserByUseCase = new ListUserByIdUseCase(usersRepository);
        createUserUseCase = new CreateUserUseCase(usersRepository)
    })

    it("should be able to list an user by Id", async () => {

        const user: ICreateUserDTO = {
            name: 'test1',
            email: 'teste@example.com',
            password: '55588899',
            driver_license: 'driver_license',
        };

        const response = await createUserUseCase.execute(user);

        const findUser = await listUserByUseCase.execute(response.id)

        expect(findUser).toHaveProperty("id");
    });

    it("should not be able to list an un-existent user ", async () => {
        await expect(async () => {

            await listUserByUseCase.execute("id")

        }).rejects.toBeInstanceOf(AppError)
    })
})
