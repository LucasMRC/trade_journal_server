
import { Router } from 'express';
import {
    getAllPlatforms,
    createNewPlatform,
    deletePlatform,
    updatePlatform
} from '@modules/platform/controller/platform.controller';

const PlatformRoutes = Router();

PlatformRoutes.post('/create', createNewPlatform);
PlatformRoutes.get('/', getAllPlatforms);
PlatformRoutes.delete('/:id', deletePlatform);
PlatformRoutes.put('/:id', updatePlatform);

export { PlatformRoutes };