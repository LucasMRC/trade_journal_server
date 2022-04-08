import { Router } from 'express';
import {
    createNewTimeframe,
    deleteTimeframe,
    getTimeframes,
    updateTimeframe
} from '../controller/timeframe.controller';

const router = Router();

router.post('/create', createNewTimeframe);
router.get('/', getTimeframes);
router.delete('/:id', deleteTimeframe);
router.put('/:id', updateTimeframe);

export default router;