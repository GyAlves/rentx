import { ICreateUserDTO } from "../../../users/dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        return user
    }
    async findById(user_id: string): Promise<User> {
        const user = this.users.find(user => user.id === user_id);
        return user;
    }
    async list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async create({ name, password, email, driver_license, }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            name,
            password,
            email,
            driver_license
        })

        this.users.push(user);

        return user

    }

}

export { UsersRepositoryInMemory }
