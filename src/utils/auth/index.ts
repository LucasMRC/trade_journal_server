import jwt, { Secret } from 'jsonwebtoken';

type UserIdObject = {
    id: number;
};

export const createToken = (user: UserIdObject) => {
    return jwt.sign(user, process.env.JWT_SECRET as Secret, {
        expiresIn: '8h'
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as Secret);
};