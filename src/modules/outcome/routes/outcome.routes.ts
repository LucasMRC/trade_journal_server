import { Router } from 'express';
import {
    createNewOutcome,
    getOutcomes,
    deleteOutcome,
    updateOutcome
} from '../controller/outcome.controller';

const OutcomeRoutes = Router();

OutcomeRoutes.post('/create', createNewOutcome);
OutcomeRoutes.get('/', getOutcomes);
OutcomeRoutes.delete('/:id', deleteOutcome);
OutcomeRoutes.put('/:id', updateOutcome);

export { OutcomeRoutes };