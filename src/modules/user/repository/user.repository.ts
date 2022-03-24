import { instanceToInstance } from 'class-transformer';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';

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
