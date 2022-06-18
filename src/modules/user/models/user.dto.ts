export class UserDTO {
    username?: string;
    email?: string;
    password: string;
}

export interface TokenDTO {
    value: string;
    expiresIn: number;
}
