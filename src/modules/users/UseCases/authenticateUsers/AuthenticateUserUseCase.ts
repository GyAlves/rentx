import { IUsersRepository } from "../../../../modules/users/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Combination email/password is wrong ', 400);
        }

        const passwordMatch = password === user.password;
        if (!passwordMatch) {
            throw new AppError("Combination email/password is wrong")
        }

        const token = sign({}, 'c32ac6a8aa1e3650c49bd21fbb6ebb3b', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { user, token }
    }
}

export { AuthenticateUserUseCase }
