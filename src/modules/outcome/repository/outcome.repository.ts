import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { OutcomeDTO, OutcomeEntity } from '@modules/outcome';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(OutcomeEntity)
export class OutcomeRepository extends Repository<OutcomeEntity> {

    async createNew(outcomeDTO: OutcomeDTO) {
        const newOutcome: OutcomeEntity = await this.save(outcomeDTO);
        return instanceToInstance(newOutcome);
    }

    async fetchOutcomes() {
        const outcome = await this.find();
        return instanceToInstance(outcome);
    }

    async deleteOutcome(outcome_id: number) {
        const outcome = this.findOne(outcome_id);
        if (!outcome) throw new ErrorWithStatus(`Outcome with id ${outcome_id} does not exist`, 400);

        return this.softDelete(outcome_id);
    }

    async updateOutcome(outcome_id: number, outcomeDTO: Partial<OutcomeDTO>) {
        const outcome = this.findOne(outcome_id);
        if (!outcome) throw new ErrorWithStatus(`Outcome with id ${outcome_id} does not exist`, 400);

        return this.update(outcome_id, outcomeDTO);
    }
}
