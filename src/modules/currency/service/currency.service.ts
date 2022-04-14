import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    CurrencyDTO,
    CurrencyRepository
} from '@modules/currency';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class CurrencyService {

    private currencyRepository: CurrencyRepository;

    constructor() {
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
        const currencys = await this.currencyRepository.fetchCurrencies();
        return currencys;
    }

    async udpateCurrency(currency_id: number, currencyDTO: Partial<CurrencyDTO>) {
        const { name } = currencyDTO;
        if (name)
            currencyDTO.name = name.toUpperCase();

        return await this.currencyRepository.updateCurrency(currency_id, currencyDTO);
    }

    async deleteCurrency(currency_id: number) {
        return await this.currencyRepository.deleteCurrency(currency_id);
    }

    async getCurrencyOrFail(currency_id: number) {
        try {
            return await this.currencyRepository.findOneOrFail(currency_id);
        } catch (error) {
            throw new ErrorWithStatus(`Currency with id ${currency_id} not found`, 404);
        }
    }

    private async failIfCurrencyNameIsNotAvailable(currency_name: string) {
        const currency = await this.currencyRepository.findOne({
            where: {
                name: currency_name.toUpperCase()
            }
        });

        if (currency) throw new ErrorWithStatus(`There's already an currency named ${currency_name}`, 400);
    }

}