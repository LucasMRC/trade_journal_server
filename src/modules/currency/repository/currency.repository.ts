import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { CurrencyEntity, CurrencyDTO } from '@modules/currency';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(CurrencyEntity)
export class CurrencyRepository extends Repository<CurrencyEntity> {

    async createNew(currencyDTO: CurrencyDTO) {
        const new_currency: CurrencyEntity = await this.save(currencyDTO);
        return plainToInstance(CurrencyEntity, new_currency);
    }

    async fetchCurrencies() {
        const currencys = await this.find();
        return instanceToInstance(currencys);
    }

    async deleteCurrency(currency_id: number) {
        const currency = this.findOne(currency_id);
        if (!currency) throw new ErrorWithStatus(`Currency with id ${currency_id} does not exist`, 400);

        return this.softDelete(currency_id);
    }

    async updateCurrency(currency_id: number, currencyDTO: Partial<CurrencyDTO>) {
        const currency = this.findOne(currency_id);
        if (!currency) throw new ErrorWithStatus(`Currency with id ${currency_id} does not exist`, 400);

        return this.update(currency_id, currencyDTO);
    }
}
