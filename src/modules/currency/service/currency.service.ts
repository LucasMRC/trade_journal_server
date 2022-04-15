import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    CurrencyDTO,
    CurrencyRepository,
    CurrencyEntity
} from '@modules/currency';
import { BaseService } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class CurrencyService extends BaseService<CurrencyEntity> {

    private currencyRepository: CurrencyRepository;

    constructor() {
        super(getCustomRepository(CurrencyRepository));
        this.currencyRepository = getCustomRepository(CurrencyRepository);
    }

    async createNewCurrency(currencyDTO: CurrencyDTO) {
        const { name } = currencyDTO;
        await this.failIfCurrencyNameIsNotAvailable(name);
        // App's convention: currency names are uppercase
        currencyDTO.name = name.toUpperCase();

        const currency = await this.currencyRepository.createNew(currencyDTO);
        return currency;
    }

    async getCurrencies() {
        const currencys = await this.findAll();
        return currencys;
    }

    async udpateCurrency(currency_id: number, currencyDTO: Partial<CurrencyDTO>) {
        const { name } = currencyDTO;
        if (name)
            currencyDTO.name = name.toUpperCase();

        return await this.currencyRepository.updateCurrency(currency_id, currencyDTO);
    }

    async deleteCurrency(currency_id: number) {
        return await this.delete(currency_id);
    }


    private async failIfCurrencyNameIsNotAvailable(currency_name: string) {
        const currency = await this.currencyRepository.findOne({
            where: {
                name: currency_name.toUpperCase()
            }
        });

        if (currency) throw new ErrorWithStatus(400, `There's already an currency named ${currency_name}`);
    }

}