import { EntityRepository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { CurrencyEntity, CurrencyDTO } from '@modules/currency';
import { BaseRepository } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(CurrencyEntity)
export class CurrencyRepository extends BaseRepository<CurrencyEntity> {

    async createNew(currencyDTO: CurrencyDTO) {
        const new_currency: CurrencyEntity = await this.save(currencyDTO);
        return plainToInstance(CurrencyEntity, new_currency);
    }

    async updateCurrency(currency_id: number, currencyDTO: Partial<CurrencyDTO>) {
        const currency = this.findOne(currency_id);
        if (!currency) throw new ErrorWithStatus(404, `Currency with id ${currency_id} does not exist`);

        return this.update(currency_id, currencyDTO);
    }
}
