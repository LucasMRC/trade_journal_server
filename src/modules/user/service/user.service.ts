
import { injectable } from 'tsyringe';
import { UserRepository } from '../repository/user.repository';
import { getCustomRepository } from 'typeorm';


@injectable()
export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async getUserByUserNname(username: string) {
        const user = await this.userRepository.findUserByUsername(username);
        return user;
    }

}