import { EntityRepository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { UserEntity } from '../models/user.entity';
import { BaseRepository } from '@modules/base';

@injectable()
@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {

    async findUserByUsername(username: string) {
        const user = await this.findOne({
            where: {
                username
            }
        });

        return instanceToInstance(user);
    }
}
