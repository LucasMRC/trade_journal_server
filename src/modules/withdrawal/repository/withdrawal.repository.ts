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
        const newWithdrawal: WithdrawalEntity = new WithdrawalEntity(amount, platform, date);
        await this.save(newWithdrawal);
        return instanceToInstance(newWithdrawal);
    }

    async fetchWithdrawals() {
        const withdrawals = await this.find();
        return instanceToInstance(withdrawals);
    }

    async deleteWithdrawal(withdrawalId: number) {
        const withdrawal = this.findOne(withdrawalId);
        if (!withdrawal) throw new ErrorWithStatus(`Withdrawal with id ${withdrawalId} does not exist`, 400);

        return this.softDelete(withdrawalId);
    }

    async updateWithdrawal(withdrawalId: number, withdrawalDTO: Partial<WithdrawalDTO>) {
        const withdrawal = this.findOne(withdrawalId);
        if (!withdrawal) throw new ErrorWithStatus(`Withdrawal with id ${withdrawalId} does not exist`, 400);

        return this.update(withdrawalId, withdrawalDTO);
    }

}
