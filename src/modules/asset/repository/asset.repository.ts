import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { AssetEntity } from '@modules/asset/models/asset.entity';
import { AssetDTO } from '@modules/asset/models/asset.dto';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(AssetEntity)
export class AssetRepository extends Repository<AssetEntity> {

    async createNew(assetDTO: AssetDTO) {
        const new_asset: AssetEntity = await this.save(assetDTO);
        return plainToInstance(AssetEntity, new_asset);
    }

    async fetchAssets() {
        const assets = await this.find();
        return instanceToInstance(assets);
    }

    async deleteAsset(asset_id: number) {
        const asset = this.findOne(asset_id);
        if (!asset) throw new ErrorWithStatus(`Asset with id ${asset_id} does not exist`, 400);

        return this.softDelete(asset_id);
    }

    async updateAsset(asset_id: number, assetDTO: Partial<AssetDTO>) {
        const asset = this.findOne(asset_id);
        if (!asset) throw new ErrorWithStatus(`Asset with id ${asset_id} does not exist`, 400);

        return this.update(asset_id, assetDTO);
    }
}
