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
        const default_date_value = new Date().toISOString().split('T')[0];
        const new_deposit: DepositEntity = this.create({
            amount,
            platform,
            date: date || default_date_value
        });
        await this.save(new_deposit);
        return instanceToInstance(new_deposit);
    }

    async fetchDeposits() {
        const deposits = await this.find();
        return instanceToInstance(deposits);
    }

    async deleteDeposit(deposit_id: number) {
        const deposit = this.findOne(deposit_id);
        if (!deposit) throw new ErrorWithStatus(`Deposit with id ${deposit_id} does not exist`, 400);

        return this.softDelete(deposit_id);
    }

    async updateDeposit(deposit_id: number, depositDTO: Partial<DepositDTO>) {
        const deposit = this.findOne(deposit_id);
        if (!deposit) throw new ErrorWithStatus(`Deposit with id ${deposit_id} does not exist`, 400);

        return this.update(deposit_id, depositDTO);
    }

}
