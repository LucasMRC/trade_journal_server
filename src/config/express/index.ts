import express, {
    Application,
    NextFunction,
    Request,
    Response
} from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export default (app: Application) => {
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
};

export const ErrorHandler = (err: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status).json({
        status: err.status,
        message: err.message
    });
};