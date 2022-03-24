import { EntityRepository, Repository } from 'typeorm';
import { OutcomeEntity } from '../models/outcome.entity';

@EntityRepository(OutcomeEntity)
export class OutcomeRepository extends Repository<OutcomeEntity> {

}
