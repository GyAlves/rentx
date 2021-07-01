import { User } from "@modules/users/infra/typeorm/entities/User";
import { ICreateUserDTO, IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ name, email, password, driver_license, }: ICreateUserDTO): Promise<User> {
        const findUser = await this.usersRepository.findByEmail(email);

        if (findUser) {
            throw new AppError("User already exists", 400);
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password,
            driver_license
        })

        return user
    }
}

export { CreateUserUseCase }
