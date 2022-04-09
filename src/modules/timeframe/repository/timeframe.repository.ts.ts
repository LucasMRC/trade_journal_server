import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { TimeframeEntity, TimeframeDTO } from '@modules/timeframe';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(TimeframeEntity)
export class TimeframeRepository extends Repository<TimeframeEntity> {

    async createNew(timeframeDTO: TimeframeDTO) {
        const newTimeframe: TimeframeEntity = await this.save(timeframeDTO);
        return plainToInstance(TimeframeEntity, newTimeframe);
    }

    async fetchTimeframes() {
        const timeframe = await this.find();
        return instanceToInstance(timeframe);
    }

    async deleteTimeframe(timeframe_id: number) {
        const timeframe = this.findOne(timeframe_id);
        if (!timeframe) throw new ErrorWithStatus(`Timeframe with id ${timeframe_id} does not exist`, 400);

        return this.softDelete(timeframe_id);
    }

    async updateTimeframe(timeframe_id: number, timeframeDTO: Partial<TimeframeDTO>) {
        const timeframe = this.findOne(timeframe_id);
        if (!timeframe) throw new ErrorWithStatus(`Timeframe with id ${timeframe_id} does not exist`, 400);

        return this.update(timeframe_id, timeframeDTO);
    }

}
