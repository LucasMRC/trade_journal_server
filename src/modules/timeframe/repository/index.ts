import { EntityRepository, Repository } from 'typeorm';
import { TimeframeEntity } from '../models/timeframe.entity';

@EntityRepository(TimeframeEntity)
export class TimeframeRepository extends Repository<TimeframeEntity> {

}
