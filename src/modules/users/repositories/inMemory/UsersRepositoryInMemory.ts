import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
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
        return this.users
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

    async update({ user_id, name, email, driver_license }: IUpdateUserDTO): Promise<User> {
        const findUser = this.users.find(user => user.id === user_id);

        if (name) {
            findUser.name = name;
        }

        if (email) {
            findUser.email = email;
        }

        if (driver_license) {
            findUser.driver_license = driver_license
        }

        return findUser

    }

}

export { UsersRepositoryInMemory }
