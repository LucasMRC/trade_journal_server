import { EntityRepository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { TimeframeEntity, TimeframeDTO } from '@modules/timeframe';
import { BaseRepository } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(TimeframeEntity)
export class TimeframeRepository extends BaseRepository<TimeframeEntity> {

    async createNew(timeframeDTO: TimeframeDTO) {
        const newTimeframe: TimeframeEntity = await this.save(timeframeDTO);
        return plainToInstance(TimeframeEntity, newTimeframe);
    }

    async updateTimeframe(timeframe_id: number, timeframeDTO: Partial<TimeframeDTO>) {
        const timeframe = this.findOne(timeframe_id);
        if (!timeframe) throw new ErrorWithStatus(404, `Timeframe with id ${timeframe_id} does not exist`);

        return this.update(timeframe_id, timeframeDTO);
    }

}
