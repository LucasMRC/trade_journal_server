
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { AssetDTO } from '@modules/asset/models/asset.dto';
import { AssetService } from '@modules/asset/service/asset.service';

// Utils
import isNumber from '@utils/functions/isNumber';
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

    const assetService = container.resolve(AssetService);
    try {
        if (!isNumber(assetId)) throw new ErrorWithStatus('Asset id is not a valid number', 400);
        const response = await assetService.deleteAsset(assetId);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateAsset = async (req: Request, res: Response, next: NextFunction) => {
    const { id: assetId } = req.params;

    const assetDTO: Partial<AssetDTO> = req.body;
    const assetService = container.resolve(AssetService);
    try {
        if (!isNumber(assetId)) throw new ErrorWithStatus('Asset id is not a valid number', 400);
        const response = await assetService.udpateAsset(assetId, assetDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};