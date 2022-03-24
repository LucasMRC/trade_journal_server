import { EntityRepository, Repository } from 'typeorm';
import { WithdrawalEntity } from '../models/withdrawal.entity';

@EntityRepository(WithdrawalEntity)
export class WithdrawalRepository extends Repository<WithdrawalEntity> {

}
