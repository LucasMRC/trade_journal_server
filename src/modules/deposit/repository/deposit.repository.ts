import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { DepositEntity, DepositDTO } from '@modules/deposit';
import { PlatformEntity } from '@modules/platform';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(DepositEntity)
export class DepositRepository extends Repository<DepositEntity> {

    async createNew(depositDTO: DepositDTO, platform: PlatformEntity) {
        const { amount, date } = depositDTO;
        const newDeposit: DepositEntity = new DepositEntity(amount, platform, date);
        await this.save(newDeposit);
        return instanceToInstance(newDeposit);
    }

    async fetchDeposits() {
        const deposits = await this.find();
        return instanceToInstance(deposits);
    }

    async deleteDeposit(depositId: number) {
        const deposit = this.findOne(depositId);
        if (!deposit) throw new ErrorWithStatus(`Deposit with id ${depositId} does not exist`, 400);

        return this.softDelete(depositId);
    }

    async updateDeposit(depositId: number, depositDTO: Partial<DepositDTO>) {
        const deposit = this.findOne(depositId);
        if (!deposit) throw new ErrorWithStatus(`Deposit with id ${depositId} does not exist`, 400);

        return this.update(depositId, depositDTO);
    }

}
