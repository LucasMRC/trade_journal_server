import { injectable } from 'tsyringe';

// Modules
import { AssetEntity, AssetDTO } from '@modules/asset';
import { BaseRepository } from '@modules/base';

@injectable()
export class AssetRepository extends BaseRepository<AssetEntity> {

    async createNew(assetDTO: AssetDTO) {
        const new_asset: AssetEntity = await this.save(assetDTO);
        return new_asset;
    }

    async updateAsset(asset_id: number, assetDTO: Partial<AssetDTO>) {
        return this.update(asset_id, assetDTO);
    }
}
