import { injectable } from 'tsyringe';
import * as bcrypt from 'bcrypt';
import { connection } from 'App';

// Modules
import { BaseService } from '@modules/base';
import {
    UserEntity,
    UserRepository,
    UserDTO,
    TokenDTO,
    UserLoginDto,
    UserProjection
} from '@modules/user';

// Errors
import { ObjectAlreadyExistsError, ObjectNotValidError } from '@utils/errors';

// Utils
import { createToken } from '@utils/auth';
import { cache } from '@utils/auth/cache';

@injectable()
export class UserService extends BaseService<UserEntity> {
    private userRepository: UserRepository;

    constructor() {
        super(UserEntity);
        this.userRepository = new UserRepository(
            UserEntity,
            connection.createEntityManager()
        );
    }

    async getUser(id: number) {
        const user = await this.findOneOrFail(id);
        return new UserProjection(user);
    }

    async handleRegister(user_dto: UserDTO): Promise<UserProjection> {
        const isExist = await this.userRepository.findOneBy([
            {
                email: user_dto.email
            },
            {
                username: user_dto.username
            }
        ]
        );

        if (isExist) throw new ObjectAlreadyExistsError('Either the email or the username is already in use.');

        const hashedPassword = await bcrypt.hash(user_dto.password, 10);
        const user = await this.userRepository.create({
            username: user_dto.username,
            email: user_dto.email,
            hash: hashedPassword
        } as UserEntity);

        const newUser = await this.userRepository.save(user);

        return new UserProjection(newUser);
    }

    async handleLoginUser(login_dto: UserLoginDto) {
        const user = await this.userRepository.findOneBy({ email: login_dto.email });

        if (!user) throw new ObjectNotValidError('Invalid credentials.');

        const is_matched = await bcrypt.compare(login_dto.password, user.hash);
        if (!is_matched) throw new ObjectNotValidError('Invalid credentials.');

        else {
            const token = await createToken({ id: user.id });

            return {
                access_token: token,
                token_type: 'Bearer',
                expires_in: 288000000
            };
        }
    }

    async handleLogoutUser(token_obj: TokenDTO) {
        const now = new Date();
        const expire = new Date(token_obj.expiresIn);
        const milliseconds = now.getTime() - expire.getTime();
        /* ----------------------------- BlackList Token ---------------------------- */
        await cache.set('token', token_obj.value, milliseconds);
    }

}