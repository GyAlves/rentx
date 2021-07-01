import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
    findByEmail(email: string): Promise<User>;
    findById(user_id: string): Promise<User>;
    list(): Promise<User[]>;
    create({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<User>;
}

export { ICreateUserDTO, IUsersRepository };
