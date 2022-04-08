import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    OutcomeDTO,
    OutcomeRepository
} from '@modules/outcome';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class OutcomeService {

    private outcomeRepository: OutcomeRepository;

    constructor() {
        this.outcomeRepository = getCustomRepository(OutcomeRepository);
    }

    async createNewOutcome(outcomeDTO: OutcomeDTO) {
        const { name } = outcomeDTO;
        await this.failIfOutcomeNameIsNotAvailable(name);
        // App's convention: outcome names are uppercase
        outcomeDTO.name = name.toUpperCase();

        const outcome = await this.outcomeRepository.createNew(outcomeDTO);
        return outcome;
    }

    async getOutcomes() {
        const outcomes = await this.outcomeRepository.fetchOutcomes();
        return outcomes;
    }

    async udpateOutcome(outcomeId: number, outcomeDTO: Partial<OutcomeDTO>) {
        const { name } = outcomeDTO;
        if (name)
            outcomeDTO.name = name.toUpperCase();

        return await this.outcomeRepository.updateOutcome(outcomeId, outcomeDTO);
    }

    async deleteOutcome(outcomeId: number) {
        return await this.outcomeRepository.deleteOutcome(outcomeId);
    }

    private async failIfOutcomeNameIsNotAvailable(outcomeName: string) {
        const outcome = await this.outcomeRepository.findOne({
            where: {
                name: outcomeName.toUpperCase()
            }
        });

        if (outcome) throw new ErrorWithStatus(`There's already an outcome named ${outcomeName}`, 400);
    }

}