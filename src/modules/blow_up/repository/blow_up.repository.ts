import { EntityRepository } from 'typeorm';
import { injectable } from 'tsyringe';

// Modules
import { BaseRepository } from '@modules/base';
import { BlowUpEntity } from '../models/blow_up.entity';

@injectable()
@EntityRepository(BlowUpEntity)
export class BlowUpRepository extends BaseRepository<BlowUpEntity> {

}
