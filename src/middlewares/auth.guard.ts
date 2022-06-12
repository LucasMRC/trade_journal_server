import { Request, Response, NextFunction } from 'express';
import { cache } from '@utils/auth/cache';
import { verifyToken } from '@utils/auth';
import { JwtPayload } from 'jsonwebtoken';
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export interface AuthRequest extends Request {
    user?: string | JwtPayload;
    token?: string;
}

export const AuthGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
        const error = new ErrorWithStatus(401, 'Unauthorized.');
        next(error);
    }
    else {
        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
        try {
            token = token.trim();
            /* ---------------------- Check For Blacklisted Tokens ---------------------- */
            const isBlackListed = await cache.get(token);
            if (isBlackListed) {
                const error = new ErrorWithStatus(401, 'Session has expired.');
                next(error);
            }

            const decoded = await verifyToken(token);
            req.user = decoded;
            req.token = token;
            next();
        } catch (error) {
            console.warn(error);
            const errorWithStatus = new ErrorWithStatus(403, 'Unauthorized.');
            next(errorWithStatus);
        }
    }
};