import { injectable } from 'tsyringe';
import { FindOneOptions, getCustomRepository } from 'typeorm';

// Modules
import {
    AssetEntity,
    AssetDTO,
    AssetRepository
} from '@modules/asset';
import { BaseService } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class AssetService extends BaseService<AssetEntity> {

    private assetRepository: AssetRepository;

    constructor() {
        super(AssetEntity);
        this.assetRepository = getCustomRepository(AssetRepository);
    }

    async createNewAsset(assetDTO: AssetDTO) {
        const { name } = assetDTO;
        await this.failIfNameIsNotAvailable(name);
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

        this.findOneOrFail(asset_id);
        return await this.assetRepository.updateAsset(asset_id, assetDTO);
    }

    async deleteAsset(asset_id: number) {
        return await this.delete(asset_id);
    }

    async failIfNameIsNotAvailable(asset_name: string) {
        const asset = await this.assetRepository.findOne({ name: asset_name } as FindOneOptions<AssetEntity>);
        if (asset) throw new ErrorWithStatus(400, `There's already an asset named ${asset_name}`);
    }

}