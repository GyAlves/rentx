import { getRepository, Repository } from 'typeorm';

import {
    ICreateUserDTO,
    IUsersRepository,
} from '../../../repositories/IUsersRepository';
import { User } from '../entities/User';

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
}

export { UsersRepository };
