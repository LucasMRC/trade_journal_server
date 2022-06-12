
import { injectable } from 'tsyringe';
import { FindOneOptions } from 'typeorm';
import bcrypt from 'bcrypt';

// Modules
import { BaseService } from '@modules/base';
import { UserEntity, UserRepository, UserDTO, TokenDTO } from '@modules/user';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';
import { createToken } from '@utils/auth';
import { cache } from '@utils/auth/cache';
import { connection } from 'App';

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
        return user;
    }

    async handleRegister(user_dto: UserDTO) {
        const isExist = await this.userRepository.findOne({
            where: [
                {
                    email: user_dto.email
                },
                {
                    username: user_dto.username
                }
            ]
        } as FindOneOptions<UserEntity>);

        if (isExist) {
            throw new ErrorWithStatus(400, 'Either the email or the username already exists');
        }

        const hashedPassword = await bcrypt.hash(user_dto.password, 10);
        const user = await this.userRepository.create({
            username: user_dto.username,
            email: user_dto.email,
            hash: hashedPassword
        } as UserEntity);

        this.userRepository.save(user);

        return user;
    }

    async handleLoginUser(user_dto: UserDTO) {
        const user = await this.userRepository.findOne({
            where: [
                {
                    email: user_dto.email
                },
                {
                    username: user_dto.username
                }
            ]
        } as FindOneOptions<UserEntity>);

        if (!user)
            throw new ErrorWithStatus(401, 'Invalid credentials');
        const is_matched = await bcrypt.compare(user_dto.password, user.hash);
        if (!is_matched)
            throw new ErrorWithStatus(401, 'Invalid credentials');
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