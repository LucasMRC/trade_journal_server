
import { Router } from 'express';

// Modules
import {
    createNewAsset,
    getAssets,
    deleteAsset,
    updateAsset
} from '@modules/asset/controller/asset.controller';

const router = Router();

router.post('/create', createNewAsset);
router.get('/', getAssets);
router.delete('/:id', deleteAsset);
router.put('/:id', updateAsset);

export default router;
