import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    AssetDTO,
    AssetRepository
} from '@modules/asset';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class AssetService {

    private assetRepository: AssetRepository;

    constructor() {
        this.assetRepository = getCustomRepository(AssetRepository);
    }

    async createNewAsset(assetDTO: AssetDTO) {
        const { name } = assetDTO;
        await this.failIfAssetNameIsNotAvailable(name);
        // App's convention: asset names are uppercase
        assetDTO.name = name.toUpperCase();

        const asset = await this.assetRepository.createNew(assetDTO);
        return asset;
    }

    async getAssets() {
        const assets = await this.assetRepository.fetchAssets();
        return assets;
    }

    async udpateAsset(assetId: number, assetDTO: Partial<AssetDTO>) {
        const { name } = assetDTO;
        if (name)
            assetDTO.name = name.toUpperCase();

        return await this.assetRepository.updateAsset(assetId, assetDTO);
    }

    async deleteAsset(assetId: number) {
        return await this.assetRepository.deleteAsset(assetId);
    }

    private async failIfAssetNameIsNotAvailable(assetName: string) {
        const asset = await this.assetRepository.findOne({
            where: {
                name: assetName.toUpperCase()
            }
        });

        if (asset) throw new ErrorWithStatus(`There's already an asset named ${assetName}`, 400);
    }

}