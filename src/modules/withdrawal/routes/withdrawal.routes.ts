import { Router } from 'express';

// Controller
import {
    createNewWithdrawal,
    getWithdrawals,
    deleteWithdrawal,
    updateWithdrawal
} from '../controller/withdrawal.controller';

const router = Router();

router.post('/create', createNewWithdrawal);
router.get('/', getWithdrawals);
router.delete('/:id', deleteWithdrawal);
router.put('/:id', updateWithdrawal);

export default router;