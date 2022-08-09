import { Request, Response, NextFunction } from 'express';
import { cache } from '@utils/auth/cache';
import { verifyToken } from '@utils/auth';
import { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '@utils/errors';

export interface AuthRequest extends Request {
    user?: string | JwtPayload;
    token?: string;
}

export const AuthGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
        const error = new UnauthorizedError('Unauthorized.');
        next(error);
    }
    else {
        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
        try {
            token = token.trim();
            /* ---------------------- Check For Blacklisted Tokens ---------------------- */
            const isBlackListed = await cache.get(token);
            if (isBlackListed) {
                const error = new UnauthorizedError('Session has expired.');
                next(error);
            }
            /* -------------------------------------------------------------------------- */
            const decoded = await verifyToken(token);
            req.user = decoded;
            req.token = token;
            next();
        } catch (error) {
            console.warn(error);
            const unauthorizedError = new UnauthorizedError('Unauthorized.');
            next(unauthorizedError);
        }
    }
};