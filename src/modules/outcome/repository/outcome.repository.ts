import { injectable } from 'tsyringe';

// Modules
import { OutcomeDTO, OutcomeEntity } from '@modules/outcome';
import { BaseRepository } from '@modules/base';

@injectable()
export class OutcomeRepository extends BaseRepository<OutcomeEntity> {

    async createNew(outcomeDTO: OutcomeDTO) {
        const newOutcome: OutcomeEntity = await this.save(outcomeDTO);
        return newOutcome;
    }

    async updateOutcome(outcome_id: number, outcomeDTO: Partial<OutcomeDTO>) {
        return this.update(outcome_id, outcomeDTO);
    }
}
