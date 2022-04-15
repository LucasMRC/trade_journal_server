import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    AssetEntity,
    AssetDTO,
    AssetRepository
} from '@modules/asset';
import { BaseService } from '@modules/base';

@injectable()
export class AssetService extends BaseService<AssetEntity> {

    private assetRepository: AssetRepository;

    constructor() {
        super(getCustomRepository(AssetRepository));
        this.assetRepository = getCustomRepository(AssetRepository);
    }

    async createNewAsset(assetDTO: AssetDTO) {
        const { name } = assetDTO;
        await this.assetRepository.failIfNameIsNotAvailable(name);
        // App's convention: asset names are uppercase
        assetDTO.name = name.toUpperCase();

        const asset = await this.assetRepository.createNew(assetDTO);
        return asset;
    }

    async getAssets() {
        const assets = await this.findAll();
        return assets;
    }

    async udpateAsset(asset_id: number, assetDTO: Partial<AssetDTO>) {
        const { name } = assetDTO;
        if (name)
            assetDTO.name = name.toUpperCase();

        return await this.assetRepository.updateAsset(asset_id, assetDTO);
    }

    async deleteAsset(asset_id: number) {
        return await this.delete(asset_id);
    }

}