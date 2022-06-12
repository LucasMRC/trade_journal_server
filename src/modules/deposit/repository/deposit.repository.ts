import { EntityRepository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { DepositEntity, DepositDTO } from '@modules/deposit';
import { PlatformEntity } from '@modules/platform';
import { BaseRepository } from '@modules/base';

// Utils
import { DateTransformer } from '@utils/transformers';

@injectable()
@EntityRepository(DepositEntity)
export class DepositRepository extends BaseRepository<DepositEntity> {

    async createNew(depositDTO: DepositDTO, platform: PlatformEntity) {
        const { amount, date } = depositDTO;
        const default_date_value = new DateTransformer().from(new Date());
        const new_deposit: DepositEntity = this.create({
            amount,
            platform,
            date: date || default_date_value
        });
        await this.save(new_deposit);
        return instanceToInstance(new_deposit);
    }

    async updateDeposit(deposit_id: number, depositDTO: Partial<DepositDTO>) {
        return this.update(deposit_id, depositDTO);
    }

}
