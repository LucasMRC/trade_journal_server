import { EntityRepository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { TimeframeEntity, TimeframeDTO } from '@modules/timeframe';
import { BaseRepository } from '@modules/base';

@injectable()
@EntityRepository(TimeframeEntity)
export class TimeframeRepository extends BaseRepository<TimeframeEntity> {

    async createNew(timeframeDTO: TimeframeDTO) {
        const newTimeframe: TimeframeEntity = await this.save(timeframeDTO);
        return plainToInstance(TimeframeEntity, newTimeframe);
    }

    async updateTimeframe(timeframe_id: number, timeframeDTO: Partial<TimeframeDTO>) {
        return this.update(timeframe_id, timeframeDTO);
    }

}
