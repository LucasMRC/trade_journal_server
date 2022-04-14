import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    TimeframeDTO,
    TimeframeRepository
} from '@modules/timeframe';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class TimeframeService {

    private timeframeRepository: TimeframeRepository;

    constructor() {
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
        const timeframes = await this.timeframeRepository.fetchTimeframes();
        return timeframes;
    }

    async udpateTimeframe(timeframe_id: number, timeframeDTO: Partial<TimeframeDTO>) {
        const { name } = timeframeDTO;
        if (name)
            timeframeDTO.name = name.toUpperCase();

        return await this.timeframeRepository.updateTimeframe(timeframe_id, timeframeDTO);
    }

    async deleteTimeframe(timeframe_id: number) {
        return await this.timeframeRepository.deleteTimeframe(timeframe_id);
    }

    async getTimeframeOrFail(timeframe_id: number) {
        try {
            return await this.timeframeRepository.findOneOrFail(timeframe_id);
        } catch (error) {
            throw new ErrorWithStatus(`Timeframe with id ${timeframe_id} not found`, 404);
        }
    }

    private async failIfTimeframeNameIsNotAvailable(timeframe_name: string) {
        const timeframe = await this.timeframeRepository.findOne({
            where: {
                name: timeframe_name.toUpperCase()
            }
        });

        if (timeframe) throw new ErrorWithStatus(`There's already an timeframe named ${timeframe_name}`, 400);
    }

}