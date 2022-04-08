import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
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
        return instanceToInstance(newTimeframe);
    }

    async fetchTimeframes() {
        const timeframe = await this.find();
        return instanceToInstance(timeframe);
    }

    async deleteTimeframe(timeframeId: number) {
        const timeframe = this.findOne(timeframeId);
        if (!timeframe) throw new ErrorWithStatus(`Timeframe with id ${timeframeId} does not exist`, 400);

        return this.softDelete(timeframeId);
    }

    async updateTimeframe(timeframeId: number, timeframeDTO: Partial<TimeframeDTO>) {
        const timeframe = this.findOne(timeframeId);
        if (!timeframe) throw new ErrorWithStatus(`Timeframe with id ${timeframeId} does not exist`, 400);

        return this.update(timeframeId, timeframeDTO);
    }

}
