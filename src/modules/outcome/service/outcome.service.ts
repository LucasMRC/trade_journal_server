import { injectable } from 'tsyringe';
import { connection } from 'App';

// Modules
import {
    OutcomeDTO,
    OutcomeEntity,
    OutcomeRepository
} from '@modules/outcome';
import { BaseService } from '@modules/base';

// Errors
import { ObjectAlreadyExistsError } from '@utils/errors';

@injectable()
export class OutcomeService extends BaseService<OutcomeEntity> {

    private outcomeRepository: OutcomeRepository;

    constructor() {
        super(OutcomeEntity);
        this.outcomeRepository = new OutcomeRepository(
            OutcomeEntity,
            connection.createEntityManager()
        );
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
        const outcomes = await this.findAll();
        return outcomes;
    }

    async udpateOutcome(outcome_id: number, outcomeDTO: Partial<OutcomeDTO>) {
        const { name } = outcomeDTO;
        if (name) outcomeDTO.name = name.toUpperCase();

        this.findOneOrFail(outcome_id);
        return await this.outcomeRepository.updateOutcome(outcome_id, outcomeDTO);
    }

    async deleteOutcome(outcome_id: number) {
        return await this.delete(outcome_id);
    }

    private async failIfOutcomeNameIsNotAvailable(outcome_name: string) {
        const outcome = await this.outcomeRepository.findOneBy({ name: outcome_name.toUpperCase() });

        if (outcome) throw new ObjectAlreadyExistsError(`There's already an outcome named ${outcome_name}.`);
    }

}