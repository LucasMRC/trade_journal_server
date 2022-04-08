import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { UserEntity } from '../models/user.entity';

@injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async findUserByUsername(username: string) {
        const user = await this.findOne({
            where: {
                username
            }
        });

        return instanceToInstance(user);
    }
}
