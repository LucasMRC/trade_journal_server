import { EntityRepository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { AssetEntity } from '@modules/asset/models/asset.entity';
import { AssetDTO } from '@modules/asset/models/asset.dto';
import { BaseRepository } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(AssetEntity)
export class AssetRepository extends BaseRepository<AssetEntity> {

    async createNew(assetDTO: AssetDTO) {
        const new_asset: AssetEntity = await this.save(assetDTO);
        return plainToInstance(AssetEntity, new_asset);
    }

    async updateAsset(asset_id: number, assetDTO: Partial<AssetDTO>) {
        const asset = this.findOne(asset_id);
        if (!asset) throw new ErrorWithStatus(400, `Asset with id ${asset_id} does not exist`);

        return this.update(asset_id, assetDTO);
    }
}
