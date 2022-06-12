
import { Router } from 'express';

// Modules
import {
    createNewCurrency,
    getCurrencies,
    deleteCurrency,
    updateCurrency
} from '@modules/currency/controller/currency.controller';

const CurrencyRoutes = Router();

CurrencyRoutes.post('/create', createNewCurrency);
CurrencyRoutes.get('/', getCurrencies);
CurrencyRoutes.delete('/:id', deleteCurrency);
CurrencyRoutes.put('/:id', updateCurrency);

export { CurrencyRoutes };
