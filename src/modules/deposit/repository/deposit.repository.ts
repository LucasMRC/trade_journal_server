import { EntityRepository, Repository } from 'typeorm';
import { DepositEntity } from '../models/deposit.entity';

@EntityRepository(DepositEntity)
export class DepositRepository extends Repository<DepositEntity> {

}
