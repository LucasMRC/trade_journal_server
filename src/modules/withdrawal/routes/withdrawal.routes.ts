import { Router } from 'express';

// Controller
import {
    createNewWithdrawal,
    getWithdrawals,
    deleteWithdrawal,
    updateWithdrawal
} from '../controller/withdrawal.controller';

const WithdrawalRoutes = Router();

WithdrawalRoutes.post('/create', createNewWithdrawal);
WithdrawalRoutes.get('/', getWithdrawals);
WithdrawalRoutes.delete('/:id', deleteWithdrawal);
WithdrawalRoutes.put('/:id', updateWithdrawal);

export { WithdrawalRoutes };