import { EntityRepository, Repository } from 'typeorm';
import { BlowUpEntity } from '../models/blow_up.entity';

@EntityRepository(BlowUpEntity)
export class BlowUpRepository extends Repository<BlowUpEntity> {

}
