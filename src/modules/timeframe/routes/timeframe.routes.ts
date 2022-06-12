import { Router } from 'express';
import {
    createNewTimeframe,
    deleteTimeframe,
    getTimeframes,
    updateTimeframe
} from '../controller/timeframe.controller';

const TimeframeRoutes = Router();

TimeframeRoutes.post('/create', createNewTimeframe);
TimeframeRoutes.get('/', getTimeframes);
TimeframeRoutes.delete('/:id', deleteTimeframe);
TimeframeRoutes.put('/:id', updateTimeframe);

export { TimeframeRoutes };