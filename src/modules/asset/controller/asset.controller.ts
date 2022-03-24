
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { AssetDTO } from '@modules/asset/models/asset.dto';
import { AssetService } from '@modules/asset/service/asset.service';

export const createNewAsset = async (req: Request, res: Response, next: NextFunction) => {
    const assetDTO: AssetDTO = req.body;
    const assetService = container.resolve(AssetService);
    try {
        const response = await assetService.createNewAsset(assetDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};