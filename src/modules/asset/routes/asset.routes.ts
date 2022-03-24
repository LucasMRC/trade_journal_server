
import { Router } from 'express';

// Modules
import { createNewAsset } from '@modules/asset/controller/asset.controller';

const router = Router();

router.post('/create', createNewAsset);

export default router;
