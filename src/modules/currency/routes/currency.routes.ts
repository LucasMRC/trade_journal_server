
import { Router } from 'express';

// Modules
import {
    createNewCurrency,
    getCurrencies,
    deleteCurrency,
    updateCurrency
} from '@modules/currency/controller/currency.controller';

const router = Router();

router.post('/create', createNewCurrency);
router.get('/', getCurrencies);
router.delete('/:id', deleteCurrency);
router.put('/:id', updateCurrency);

export default router;
