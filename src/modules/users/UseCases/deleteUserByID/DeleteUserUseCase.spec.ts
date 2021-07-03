import { UsersRepositoryInMemory } from "../../../../modules/users/repositories/inMemory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "../../../../modules/users/dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../createUsers/CreateUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let usersRepository: UsersRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Delete Users", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        deleteUserUseCase = new DeleteUserUseCase(usersRepository);
        createUserUseCase = new CreateUserUseCase(usersRepository);
    })

    it("should be able to delete an user by ID", async () => {
        const user: ICreateUserDTO = {
            name: 'test1',
            email: 'teste@example.com',
            password: '55588899',
            driver_license: 'driver_license',
        };

        const userCreated = await createUserUseCase.execute(user);
        const response = await deleteUserUseCase.execute(userCreated.id)

        expect(response).toBeUndefined()
    })

    it("should not be able to delete an un-existent user ", async () => {
        await expect(async () => {
            await usersRepository.findById("id")
            await deleteUserUseCase.execute("id")
        }).rejects.toBeInstanceOf(AppError);
    })
})
