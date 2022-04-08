import { EntityRepository, Repository } from 'typeorm';
import { injectable } from 'tsyringe';

// Modules
import { TradeEntity } from '../models/trade.entity';

@injectable()
@EntityRepository(TradeEntity)
export class TradeRepository extends Repository<TradeEntity> {

}
