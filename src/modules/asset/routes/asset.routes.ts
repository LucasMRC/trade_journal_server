
import { Router } from 'express';

// Modules
import {
    createNewAsset,
    getAssets,
    deleteAsset,
    updateAsset
} from '@modules/asset/controller/asset.controller';

const AssetRoutes = Router();

AssetRoutes.post('/create', createNewAsset);
AssetRoutes.get('/', getAssets);
AssetRoutes.delete('/:id', deleteAsset);
AssetRoutes.put('/:id', updateAsset);

export { AssetRoutes };
