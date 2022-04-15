import { EntityRepository } from 'typeorm';
import {  plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { OutcomeDTO, OutcomeEntity } from '@modules/outcome';
import { BaseRepository } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(OutcomeEntity)
export class OutcomeRepository extends BaseRepository<OutcomeEntity> {

    async createNew(outcomeDTO: OutcomeDTO) {
        const newOutcome: OutcomeEntity = await this.save(outcomeDTO);
        return plainToInstance(OutcomeEntity, newOutcome);
    }

    async updateOutcome(outcome_id: number, outcomeDTO: Partial<OutcomeDTO>) {
        const outcome = this.findOne(outcome_id);
        if (!outcome) throw new ErrorWithStatus(404, `Outcome with id ${outcome_id} does not exist`);

        return this.update(outcome_id, outcomeDTO);
    }
}
