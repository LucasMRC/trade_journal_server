import { getCustomRepository } from 'typeorm';
import { injectable } from 'tsyringe';

// Modules
import { SymbolDTO, SymbolRepository } from '@modules/symbol';
import { AssetRepository } from '@modules/asset';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class SymbolService {

    private symbolRepository: SymbolRepository;
    private assetRepository: AssetRepository;

    constructor() {
        this.symbolRepository = getCustomRepository(SymbolRepository);
        this.assetRepository = getCustomRepository(AssetRepository);
    }

    async createNewSymbol(symbolDTO: SymbolDTO) {
        const { name } = symbolDTO;
        const asset = await this.failIfSymbolNameIsNotAvailableOrReturnAsset(symbolDTO);
        // App's convention: symbol names are uppercase
        const uppercasedName = name.toUpperCase();

        return this.symbolRepository.createNew(uppercasedName, asset);
    }

    async getSymbols() {
        const symbols = await this.symbolRepository.fetchSymbols();
        return symbols;
    }

    async udpateSymbol(symbolId: number, symbolDTO: Partial<SymbolDTO>) {
        const { name } = symbolDTO;

        if (name)
            symbolDTO.name = name.toUpperCase();

        return await this.symbolRepository.updateSymbol(symbolId, symbolDTO);
    }

    async deleteSymbol(symbolId: number) {
        return await this.symbolRepository.deleteSymbol(symbolId);
    }

    private async failIfSymbolNameIsNotAvailableOrReturnAsset(symbolDTO: SymbolDTO) {
        const { assetId, name } = symbolDTO;

        const currentAsset = await this.assetRepository.findOne({
            where: {
                id: assetId
            }
        });
        if (!currentAsset) throw new ErrorWithStatus(`There's no asset with id ${assetId}`, 400);

        const symbol = await this.symbolRepository.findOne({
            where: {
                name: name.toUpperCase()
            }
        });

        if (symbol) throw new ErrorWithStatus(`There's already an symbol named ${name}`, 400);

        return currentAsset;
    }
}