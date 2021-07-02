import { inject, injectable } from "tsyringe";

import { User } from "../../../../modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class ListUserByIdUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(user_id: string): Promise<User> {
        const findUser = await this.usersRepository.findById(user_id);

        if (!findUser) {
            throw new AppError("User not found", 404)
        }

        return findUser
    }
}
export { ListUserByIdUseCase }
