import { EntityRepository, Repository } from 'typeorm';
import { TradeEntity } from '../models/trade.entity';

@EntityRepository(TradeEntity)
export class TradeRepository extends Repository<TradeEntity> {

}
