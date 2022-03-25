import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';

// Modules
import { AssetEntity } from '@modules/asset/models/asset.entity';
import { AssetDTO } from '@modules/asset/models/asset.dto';
import ErrorWithStatus from '../../../utils/errors/ErrorWithStatus';

@EntityRepository(AssetEntity)
export class AssetRepository extends Repository<AssetEntity> {
    async createNew(assetDTO: AssetDTO) {
        const newAsset: AssetEntity = await this.save(assetDTO);
        return instanceToInstance(newAsset);
    }

    async fetchAssets() {
        const assets = await this.find();
        return instanceToInstance(assets);
    }

    async deleteAsset(assetId: number) {
        const asset = this.findOne(assetId);
        if (!asset) throw new ErrorWithStatus(`Asset with id ${assetId} does not exist`, 400);

        return this.softDelete(assetId);
    }

    async updateAsset(assetId: number, assetDTO: Partial<AssetDTO>) {
        const asset = this.findOne(assetId);
        if (!asset) throw new ErrorWithStatus(`Asset with id ${assetId} does not exist`, 400);

        return this.update(assetId, assetDTO);
    }

}
