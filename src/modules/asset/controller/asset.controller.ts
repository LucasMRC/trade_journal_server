
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { AssetDTO, assertIsAssetDTO, AssetService } from '@modules/asset';

// Errors
import { ObjectNotValidError } from '@utils/errors';

export const createNewAsset = async (req: Request, res: Response, next: NextFunction) => {
    const assetDTO = req.body;
    const assetService = container.resolve(AssetService);

    try {
        assertIsAssetDTO(assetDTO);
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
    const { id: asset_id } = req.params;
    const assetService = container.resolve(AssetService);

    try {
        const id_as_number = Number(asset_id);
        if (!id_as_number) throw new ObjectNotValidError('Asset id is not a valid number.');

        const response = await assetService.deleteAsset(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateAsset = async (req: Request, res: Response, next: NextFunction) => {
    const { id: asset_id } = req.params;
    const assetDTO: Partial<AssetDTO> = req.body;
    const assetService = container.resolve(AssetService);

    try {
        const id_as_number = Number(asset_id);
        if (!id_as_number) throw new ObjectNotValidError('Asset id is not a valid number.');

        const response = await assetService.udpateAsset(id_as_number, assetDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};