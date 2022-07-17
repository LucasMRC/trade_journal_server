import { injectable } from 'tsyringe';

// Modules
import { TimeframeEntity, TimeframeDTO } from '@modules/timeframe';
import { BaseRepository } from '@modules/base';

@injectable()
export class TimeframeRepository extends BaseRepository<TimeframeEntity> {

    async createNew(timeframeDTO: TimeframeDTO) {
        const newTimeframe: TimeframeEntity = await this.save(timeframeDTO);
        return newTimeframe;
    }

    async updateTimeframe(timeframe_id: number, timeframeDTO: Partial<TimeframeDTO>) {
        return this.update(timeframe_id, timeframeDTO);
    }

}
