import { EntityRepository, Repository } from 'typeorm';
import { injectable } from 'tsyringe';

// Modules
import { BlowUpEntity } from '../models/blow_up.entity';

@injectable()
@EntityRepository(BlowUpEntity)
export class BlowUpRepository extends Repository<BlowUpEntity> {

}
