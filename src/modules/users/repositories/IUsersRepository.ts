import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';
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
    update({ name, email, driver_license }: IUpdateUserDTO): Promise<User>;
    deleteById(user_id: string): Promise<void>;
}

export { ICreateUserDTO, IUsersRepository };
