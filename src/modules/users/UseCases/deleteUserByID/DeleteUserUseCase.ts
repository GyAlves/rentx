import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute(user_id: string) {
        const findUser = await this.usersRepository.findById(user_id);

        if (!findUser) {
            throw new AppError("User not found", 404)
        }

        await this.usersRepository.deleteById(findUser.id)
    }
}

export { DeleteUserUseCase }
