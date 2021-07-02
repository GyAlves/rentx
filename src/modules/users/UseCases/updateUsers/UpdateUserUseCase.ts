import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../../../modules/users/infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string,
    name?: string,
    email?: string,
    driver_license?: string
}

@injectable()
class UpdateUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ user_id, name, email, driver_license }: IRequest): Promise<User> {
        const findUser = await this.usersRepository.findById(user_id);

        if (!findUser) {
            throw new AppError("User not found")
        }

        const updatedUser = await this.usersRepository.update({ user_id, name, email, driver_license });
        return updatedUser;
    }
}

export { UpdateUsersUseCase }
