import { Router } from 'express';
import { createNewSymbol } from '@modules/symbol/controller/symbol.controller';

const router = Router();

router.post('/create', createNewSymbol);

export default router;