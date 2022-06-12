import { Router } from 'express';

// Modules
import {
    createNewTrade,
    getTrades,
    deleteTrade,
    updateTrade
} from '@modules/trade/controller/trade.controller';

const TradeRoutes = Router();

TradeRoutes.post('/create', createNewTrade);
TradeRoutes.get('/', getTrades);
TradeRoutes.delete('/:id', deleteTrade);
TradeRoutes.put('/:id', updateTrade);

export { TradeRoutes };