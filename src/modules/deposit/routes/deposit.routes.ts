import { Router } from 'express';

// Controller
import {
    createNewDeposit,
    getDeposits,
    deleteDeposit,
    updateDeposit
} from '../controller/deposit.controller';

const router = Router();

router.post('/create', createNewDeposit);
router.get('/', getDeposits);
router.delete('/:id', deleteDeposit);
router.put('/:id', updateDeposit);

export default router;