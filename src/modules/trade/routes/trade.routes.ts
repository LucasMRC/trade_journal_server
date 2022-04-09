import { Router } from 'express';

// Modules
import {
    createNewTrade,
    getTrades,
    deleteTrade,
    updateTrade
} from '@modules/trade/controller/trade.controller';

const router = Router();

router.post('/create', createNewTrade);
router.get('/', getTrades);
router.delete('/:id', deleteTrade);
router.put('/:id', updateTrade);

export default router;