import { Router } from 'express';
import {
    createNewOutcome,
    getOutcomes,
    deleteOutcome,
    updateOutcome
} from '../controller/outcome.controller';

const router = Router();

router.post('/create', createNewOutcome);
router.get('/', getOutcomes);
router.delete('/:id', deleteOutcome);
router.put('/:id', updateOutcome);

export default router;