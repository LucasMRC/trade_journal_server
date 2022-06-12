import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    TimeframeDTO,
    TimeframeRepository,
    TimeframeEntity
} from '@modules/timeframe';
import { BaseService } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class TimeframeService extends BaseService<TimeframeEntity> {

    private timeframeRepository: TimeframeRepository;

    constructor() {
        super();
        this.timeframeRepository = getCustomRepository(TimeframeRepository);
    }

    async createNewTimeframe(timeframeDTO: TimeframeDTO) {
        const { name } = timeframeDTO;
        await this.failIfTimeframeNameIsNotAvailable(name);
        // App's convention: timeframe names are uppercase
        timeframeDTO.name = name.toUpperCase();

        const timeframe = await this.timeframeRepository.createNew(timeframeDTO);
        return timeframe;
    }

    async getTimeframes() {
        const timeframes = await this.findAll();
        return timeframes;
    }

    async udpateTimeframe(timeframe_id: number, timeframeDTO: Partial<TimeframeDTO>) {
        const { name } = timeframeDTO;
        if (name)
            timeframeDTO.name = name.toUpperCase();
        this.findOneOrFail(timeframe_id);

        return await this.timeframeRepository.updateTimeframe(timeframe_id, timeframeDTO);
    }

    async deleteTimeframe(timeframe_id: number) {
        return await this.delete(timeframe_id);
    }

    private async failIfTimeframeNameIsNotAvailable(timeframe_name: string) {
        const timeframe = await this.timeframeRepository.findOne({
            where: {
                name: timeframe_name.toUpperCase()
            }
        });

        if (timeframe) throw new ErrorWithStatus(400, `There's already an timeframe named ${timeframe_name}`);
    }

}