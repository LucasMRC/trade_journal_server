import { injectable, container } from 'tsyringe';

// Modules
import { SymbolDTO, SymbolRepository, SymbolEntity } from '@modules/symbol';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';
import { AssetRepository } from '@modules/asset';

@injectable()
export class SymbolService {

    private symbolRepository: SymbolRepository;
    private assetRepository: AssetRepository;

    constructor() {
        this.symbolRepository = container.resolve(SymbolRepository);
        this.assetRepository = container.resolve(AssetRepository);
    }

    async createNewSymbol(symbolDTO: SymbolDTO) {
        const { name } = symbolDTO;
        await this.failIfAssetNameIsNotAvailable(name);

        const currentAsset = await this.assetRepository.findOneOrFail(symbolDTO.assetId);

        const newSymbol = new SymbolEntity(name, currentAsset);
        return this.symbolRepository.save(newSymbol);
    }

    async failIfAssetNameIsNotAvailable(symbolName: string) {
        const asset = await this.symbolRepository.findOne({
            where: {
                name: symbolName.toLowerCase()
            }
        });

        if (asset) throw new ErrorWithStatus(`There's already an symbol named ${symbolName}`, 400);
    }
}