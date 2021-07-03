import { getConnection, getRepository, Repository } from 'typeorm';

import {
    ICreateUserDTO,
    IUsersRepository,
} from '../../../repositories/IUsersRepository';
import { User } from '../entities/User';

interface IRequest {
    user_id: string,
    name?: string,
    email?: string,
    driver_license?: string
}

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        password,
        email,
        driver_license,
        id,
    }: ICreateUserDTO): Promise<User> {
        const user = await this.repository.create({
            name,
            password,
            email,
            driver_license,
            id,
        });

        await this.repository.save(user);

        return user
    }

    async list(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(user_id: string): Promise<User> {
        const user = await this.repository.findOne(user_id);
        return user;
    }

    async update({ user_id, name, email, driver_license }: IRequest): Promise<User> {

        if (name) {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ name })
                .where("id = :id", { id: user_id })
                .execute()
        }

        if (email) {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ email })
                .where("id = :id", { id: user_id })
                .execute()
        }

        if (driver_license) {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ driver_license })
                .where("id = :id", { id: user_id })
                .execute()
        }

        const findUser = await this.repository.findOne(user_id);
        return findUser
    }

    async deleteById(user_id: string): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id: user_id })
            .execute()
    }
}

export { UsersRepository };
