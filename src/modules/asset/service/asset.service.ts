import { injectable } from 'tsyringe';
import { connection } from 'App';

// Modules
import {
    AssetEntity,
    AssetDTO,
    AssetRepository
} from '@modules/asset';
import { BaseService } from '@modules/base';

// Errors
import { ObjectAlreadyExistsError } from '@utils/errors';

@injectable()
export class AssetService extends BaseService<AssetEntity> {

    private assetRepository: AssetRepository;

    constructor() {
        super(AssetEntity);
        this.assetRepository = new AssetRepository(
            AssetEntity,
            connection.createEntityManager()
        );
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
        const asset = await this.assetRepository.findOneBy({ name: asset_name });
        if (asset) throw new ObjectAlreadyExistsError(`There's already an asset named ${asset_name}.`);
    }

}