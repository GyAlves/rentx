import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../../../modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "../../../../modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(): Promise<User[]> {
        const users = await this.usersRepository.list();

        if (!users) {
            throw new AppError("Users not found")
        }

        return users
    }
}

export { ListUsersUseCase }
