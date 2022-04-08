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

    async deleteOutcome(outcomeId: number) {
        const outcome = this.findOne(outcomeId);
        if (!outcome) throw new ErrorWithStatus(`Outcome with id ${outcomeId} does not exist`, 400);

        return this.softDelete(outcomeId);
    }

    async updateOutcome(outcomeId: number, outcomeDTO: Partial<OutcomeDTO>) {
        const outcome = this.findOne(outcomeId);
        if (!outcome) throw new ErrorWithStatus(`Outcome with id ${outcomeId} does not exist`, 400);

        return this.update(outcomeId, outcomeDTO);
    }
}
