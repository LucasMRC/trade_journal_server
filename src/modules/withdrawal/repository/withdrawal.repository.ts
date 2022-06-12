import { EntityRepository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { WithdrawalEntity, WithdrawalDTO } from '@modules/withdrawal';
import { PlatformEntity } from '@modules/platform';
import { BaseRepository } from '@modules/base';

// Utils
import { DateTransformer } from '@utils/transformers';

@injectable()
@EntityRepository(WithdrawalEntity)
export class WithdrawalRepository extends BaseRepository<WithdrawalEntity> {

    async createNew(withdrawalDTO: WithdrawalDTO, platform: PlatformEntity) {
        const { amount, date } = withdrawalDTO;
        const default_date_value = new DateTransformer().from(new Date());
        const new_withdrawal: WithdrawalEntity = this.create({
            amount,
            platform,
            date: date || default_date_value
        });
        await this.save(new_withdrawal);
        return instanceToInstance(new_withdrawal);
    }

    async updateWithdrawal(withdrawal_id: number, withdrawalDTO: Partial<WithdrawalDTO>) {
        return this.update(withdrawal_id, withdrawalDTO);
    }

}
