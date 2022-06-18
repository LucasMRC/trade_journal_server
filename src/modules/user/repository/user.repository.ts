import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { UserEntity } from '../models/user.entity';
import { BaseRepository } from '@modules/base';
import { FindOneOptions } from 'typeorm';

@injectable()
export class UserRepository extends BaseRepository<UserEntity> {

    async findUserByUsername(username: string) {
        const user = await this.findOne({ username } as FindOneOptions<UserEntity>);

        return instanceToInstance(user);
    }
}
