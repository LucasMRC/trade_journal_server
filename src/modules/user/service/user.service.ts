
import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import { BaseService } from '@modules/base';
import { UserEntity, UserRepository } from '@modules/user';


@injectable()
export class UserService extends BaseService<UserEntity> {
    private userRepository: UserRepository;

    constructor() {
        super(getCustomRepository(UserRepository));
        this.userRepository = getCustomRepository(UserRepository);
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepository.findUserByUsername(username);
        return user;
    }

}