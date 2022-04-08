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

    async udpateTimeframe(timeframeId: number, timeframeDTO: Partial<TimeframeDTO>) {
        const { name } = timeframeDTO;
        if (name)
            timeframeDTO.name = name.toUpperCase();

        return await this.timeframeRepository.updateTimeframe(timeframeId, timeframeDTO);
    }

    async deleteTimeframe(timeframeId: number) {
        return await this.timeframeRepository.deleteTimeframe(timeframeId);
    }

    private async failIfTimeframeNameIsNotAvailable(timeframeName: string) {
        const timeframe = await this.timeframeRepository.findOne({
            where: {
                name: timeframeName.toUpperCase()
            }
        });

        if (timeframe) throw new ErrorWithStatus(`There's already an timeframe named ${timeframeName}`, 400);
    }

}