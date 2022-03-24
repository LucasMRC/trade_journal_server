import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';

// Modules
import { AssetEntity } from '@modules/asset/models/asset.entity';
import { AssetDTO } from '@modules/asset/models/asset.dto';

@EntityRepository(AssetEntity)
export class AssetRepository extends Repository<AssetEntity> {
    async createNew(asset: AssetDTO) {
        const newAsset: AssetEntity = await this.save(asset);
        return instanceToInstance(newAsset);
    }
}
