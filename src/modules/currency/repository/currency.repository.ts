import { EntityRepository } from 'typeorm';
import { injectable } from 'tsyringe';

// Modules
import { CurrencyEntity, CurrencyDTO } from '@modules/currency';
import { BaseRepository } from '@modules/base';

@injectable()
@EntityRepository(CurrencyEntity)
export class CurrencyRepository extends BaseRepository<CurrencyEntity> {

    async createNew(currencyDTO: CurrencyDTO) {
        const new_currency: CurrencyEntity = await this.save(currencyDTO);
        return new_currency;
    }

    async updateCurrency(currency_id: number, currencyDTO: Partial<CurrencyDTO>) {
        return this.update(currency_id, currencyDTO);
    }
}
