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

    async udpateOutcome(outcome_id: number, outcomeDTO: Partial<OutcomeDTO>) {
        const { name } = outcomeDTO;
        if (name)
            outcomeDTO.name = name.toUpperCase();

        return await this.outcomeRepository.updateOutcome(outcome_id, outcomeDTO);
    }

    async deleteOutcome(outcome_id: number) {
        return await this.outcomeRepository.deleteOutcome(outcome_id);
    }

    async getOutcomeOrFail(outcome_id: number) {
        try {
            return await this.outcomeRepository.findOneOrFail(outcome_id);
        } catch (error) {
            throw new ErrorWithStatus(`Outcome with id ${outcome_id} not found`, 404);
        }
    }

    private async failIfOutcomeNameIsNotAvailable(outcome_name: string) {
        const outcome = await this.outcomeRepository.findOne({
            where: {
                name: outcome_name.toUpperCase()
            }
        });

        if (outcome) throw new ErrorWithStatus(`There's already an outcome named ${outcome_name}`, 400);
    }

}