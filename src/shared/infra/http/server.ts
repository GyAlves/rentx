import 'reflect-metadata';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes/index';
import { AppError } from '../../errors/AppError';

import '../../container';
import '../typeorm/index';

const app = express();

app.use(express.json());
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'errors',
            message: `Ìnternal server error - ${err.message}`,
        });
    },
);

app.listen(3333, () => {
    console.log('Server running on port 3333 !! 🚀 ');
});
