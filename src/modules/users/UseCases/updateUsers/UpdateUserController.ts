import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUsersUseCase } from './UpdateUserUseCase';


class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;
        const { name, email, driver_license } = request.body

        const updateUserUseCase = container.resolve(UpdateUsersUseCase);
        const updateUser = await updateUserUseCase.execute({ user_id, name, email, driver_license });

        return response.status(200).json(updateUser)
    }
}

export { UpdateUserController }
