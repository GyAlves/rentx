import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserByIdUseCase } from './ListUserByIdUseCase';


class ListUserByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;

        const listUserByIdUseCase = container.resolve(ListUserByIdUseCase);

        const findUser = await listUserByIdUseCase.execute(user_id);

        return response.status(200).json(findUser)
    }
}

export { ListUserByIdController }
