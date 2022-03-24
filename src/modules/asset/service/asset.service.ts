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
        const asset = await this.assetRepository.createNew(assetDTO);
        return asset;
    }

    async failIfAssetNameIsNotAvailable(assetName: string) {
        const asset = await this.assetRepository.findOne({
            where: {
                name: assetName.toLowerCase()
            }
        });

        if (asset) throw new ErrorWithStatus(`There's already an asset named ${assetName}`, 400);
    }

}