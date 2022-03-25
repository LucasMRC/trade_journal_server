import { Router } from 'express';
import {
    createNewSymbol,
    getSymbols,
    deleteSymbol,
    updateSymbol
} from '@modules/symbol/controller/symbol.controller';

const router = Router();

router.post('/create', createNewSymbol);
router.get('/', getSymbols);
router.delete('/:id', deleteSymbol);
router.put('/:id', updateSymbol);

export default router;