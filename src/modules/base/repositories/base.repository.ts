import { Repository } from 'typeorm';

// Utils
import { BaseEntity } from '@modules/base';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {

}