
import { Router } from 'express';
import {
    getAllPlatforms,
    createNewPlatform,
    deletePlatform,
    updatePlatform
} from '@modules/platform/controller/platform.controller';

const router = Router();

router.post('/create', createNewPlatform);
router.get('/', getAllPlatforms);
router.delete('/:id', deletePlatform);
router.put('/:id', updatePlatform);

export default router;