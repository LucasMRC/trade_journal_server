import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { WithdrawalEntity, WithdrawalDTO } from '@modules/withdrawal';
import { PlatformEntity } from '@modules/platform';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(WithdrawalEntity)
export class WithdrawalRepository extends Repository<WithdrawalEntity> {

    async createNew(withdrawalDTO: WithdrawalDTO, platform: PlatformEntity) {
        const { amount, date } = withdrawalDTO;
        const default_date_value = new Date().toISOString().split('T')[0];
        const new_withdrawal: WithdrawalEntity = this.create({
            amount,
            platform,
            date: date || default_date_value
        });
        await this.save(new_withdrawal);
        return instanceToInstance(new_withdrawal);
    }

    async fetchWithdrawals() {
        const withdrawals = await this.find();
        return instanceToInstance(withdrawals);
    }

    async deleteWithdrawal(withdrawal_id: number) {
        const withdrawal = this.findOne(withdrawal_id);
        if (!withdrawal) throw new ErrorWithStatus(`Withdrawal with id ${withdrawal_id} does not exist`, 400);

        return this.softDelete(withdrawal_id);
    }

    async updateWithdrawal(withdrawal_id: number, withdrawalDTO: Partial<WithdrawalDTO>) {
        const withdrawal = this.findOne(withdrawal_id);
        if (!withdrawal) throw new ErrorWithStatus(`Withdrawal with id ${withdrawal_id} does not exist`, 400);

        return this.update(withdrawal_id, withdrawalDTO);
    }

}
