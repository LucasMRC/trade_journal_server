import { Router } from 'express';

// Controller
import {
    createNewDeposit,
    getDeposits,
    deleteDeposit,
    updateDeposit
} from '../controller/deposit.controller';

const DepositRoutes = Router();

DepositRoutes.post('/create', createNewDeposit);
DepositRoutes.get('/', getDeposits);
DepositRoutes.delete('/:id', deleteDeposit);
DepositRoutes.put('/:id', updateDeposit);

export { DepositRoutes };