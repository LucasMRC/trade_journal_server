import express, {
    Application,
    NextFunction,
    Request,
    Response
} from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Errors
import {
    ObjectAlreadyExistsError,
    ObjectNotFoundError,
    InternalServerError,
    ObjectNotValidError,
    UnauthorizedError
} from '@utils/errors';

type CustomError = ObjectAlreadyExistsError | ObjectNotFoundError | InternalServerError | ObjectNotValidError | UnauthorizedError;

export default (app: Application) => {
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({
        origin: '*',
        exposedHeaders: [ 'Authorization' ]
    } as cors.CorsOptions));
};

export const ErrorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    if ('status' in err) {
        res.status(err.status).json({
            status: err.status,
            message: err.message
        });
    } else {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error'
        });
    }
};