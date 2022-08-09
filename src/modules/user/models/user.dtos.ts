import { ObjectNotValidError } from '@utils/errors';

export class UserLoginDto {
    email: string;
    password: string;
}

export class UserDTO extends UserLoginDto {
    username: string;
}

export interface TokenDTO {
    value: string;
    expiresIn: number;
}

export function assertIsUserDto(user: unknown): asserts user is UserDTO {
    if (
        typeof user !== 'object'
        || user === null
        || !('username' in user)
        || !('email' in user)
        || !('password' in user)
    ) {
        throw new ObjectNotValidError('Invalid user.');
    }
}

export function assertIsUserLoginDto(user: unknown): asserts user is UserLoginDto {
    if (
        typeof user !== 'object'
        || user === null
        || !('email' in user)
        || !('password' in user)
    ) {
        throw new ObjectNotValidError('Invalid user.');
    }
}

export function assertIsTokenDto(token: unknown): asserts token is TokenDTO {
    if (
        typeof token !== 'object'
        || token === null
        || !('value' in token)
        || !('expiresIn' in token)
    ) {
        throw new ObjectNotValidError('Invalid token.');
    }
}