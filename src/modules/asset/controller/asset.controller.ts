
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { AssetDTO } from '@modules/asset/models/asset.dto';
import { AssetService } from '@modules/asset/service/asset.service';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

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

/* TODO: Add find filters */
export const getAssets = async (_req: Request, res: Response, next: NextFunction) => {
    const assetService = container.resolve(AssetService);
    try {
        const response = await assetService.getAssets();
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const deleteAsset = async (req: Request, res: Response, next: NextFunction) => {
    const { id: assetId } = req.params;
    const idAsNumber = Number(assetId);
    if (!idAsNumber) throw new ErrorWithStatus('Asset id is not a valid number', 400);

    const assetService = container.resolve(AssetService);
    try {
        const response = await assetService.deleteAsset(idAsNumber);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateAsset = async (req: Request, res: Response, next: NextFunction) => {
    const { id: assetId } = req.params;
    const idAsNumber = Number(assetId);
    if (!idAsNumber) throw new ErrorWithStatus('Asset id is not a valid number', 400);

    const assetDTO: Partial<AssetDTO> = req.body;
    const assetService = container.resolve(AssetService);
    try {
        const response = await assetService.udpateAsset(idAsNumber, assetDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};