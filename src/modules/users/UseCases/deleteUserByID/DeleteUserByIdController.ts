import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params

        const deleteUserByIdUseCase = container.resolve(DeleteUserUseCase);
        deleteUserByIdUseCase.execute(user_id);

        return response.status(201).json({ message: "User excluded with success !" })
    }
}

export { DeleteUserByIdController }
