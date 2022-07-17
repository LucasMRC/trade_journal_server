import { UserEntity } from '@modules/user';

export class UserProjection {
    constructor(user: UserEntity) {
        this.id = user.id,
        this.username = user.username;
        this.email = user.email;
        this.picture = user.picture;
    }

    id: number;
    username: string;
    email: string;
    picture: string;
}