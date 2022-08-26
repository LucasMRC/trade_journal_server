
import { Router, Request, Response, NextFunction } from 'express';

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

// Proxy_server
AssetRoutes.post('/proxy-request', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch('https://lucas-custom-store.myshopify.com/cart/add', {
            method: 'POST',
            body: req.body,
            headers: {
                'x-requested-with': 'XMLHttpRequest',
                accept: 'application/javascript'
            }
        });
        res.send(response);
    } catch (ex: unknown) {
        next(ex);
    }
});

export { AssetRoutes };
