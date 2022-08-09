import { injectable } from 'tsyringe';
import { connection } from 'App';

// Modules
import {
    TimeframeDTO,
    TimeframeRepository,
    TimeframeEntity
} from '@modules/timeframe';
import { BaseService } from '@modules/base';

// Errors
import { ObjectAlreadyExistsError } from '@utils/errors';

@injectable()
export class TimeframeService extends BaseService<TimeframeEntity> {

    private timeframeRepository: TimeframeRepository;

    constructor() {
        super(TimeframeEntity);
        this.timeframeRepository = new TimeframeRepository(
            TimeframeEntity,
            connection.createEntityManager()
        );
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
        if (name) timeframeDTO.name = name.toUpperCase();
        this.findOneOrFail(timeframe_id);

        return await this.timeframeRepository.updateTimeframe(timeframe_id, timeframeDTO);
    }

    async deleteTimeframe(timeframe_id: number) {
        return await this.delete(timeframe_id);
    }

    private async failIfTimeframeNameIsNotAvailable(timeframe_name: string) {
        const timeframe = await this.timeframeRepository.findOneBy({ name: timeframe_name.toUpperCase() });

        if (timeframe) throw new ObjectAlreadyExistsError(`There's already an timeframe named ${timeframe_name}.`);
    }

}