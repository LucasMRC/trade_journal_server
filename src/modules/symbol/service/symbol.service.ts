import { getCustomRepository } from 'typeorm';
import { injectable, container } from 'tsyringe';

// Modules
import { SymbolDTO, SymbolRepository, SymbolEntity } from '@modules/symbol';
import { AssetService } from '@modules/asset';
import { BaseService } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class SymbolService extends BaseService<SymbolEntity> {

    private symbolRepository: SymbolRepository;
    private assetService: AssetService;

    constructor() {
        super();
        this.symbolRepository = getCustomRepository(SymbolRepository);
        this.assetService = container.resolve(AssetService);
    }

    async createNewSymbol(symbolDTO: SymbolDTO) {
        const { name } = symbolDTO;
        const asset = await this.failIfSymbolNameIsNotAvailableOrReturnAsset(symbolDTO);
        // App's convention: symbol names are uppercase
        const uppercased_name = name.toUpperCase();

        return this.symbolRepository.createNew(uppercased_name, asset);
    }

    async getSymbols() {
        const symbols = await this.symbolRepository.fetchSymbols();
        return symbols;
    }

    async udpateSymbol(symbol_id: number, symbolDTO: Partial<SymbolDTO>) {
        const { name } = symbolDTO;

        if (name)
            symbolDTO.name = name.toUpperCase();

        this.findOneOrFail(symbol_id);
        return await this.symbolRepository.updateSymbol(symbol_id, symbolDTO);
    }

    async deleteSymbol(symbol_id: number) {
        return await this.delete(symbol_id);
    }

    private async failIfSymbolNameIsNotAvailableOrReturnAsset(symbolDTO: SymbolDTO) {
        const { asset_id, name } = symbolDTO;

        const current_asset = await this.assetService.findOneOrFail(asset_id);

        const symbol = await this.symbolRepository.findOne({
            where: {
                name: name.toUpperCase()
            }
        });

        if (symbol) throw new ErrorWithStatus(400, `There's already an symbol named ${name}`);

        return current_asset;
    }
}