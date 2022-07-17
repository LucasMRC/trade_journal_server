import { injectable } from 'tsyringe';

// Modules
import { SymbolEntity, SymbolDTO } from '@modules/symbol';
import { AssetEntity } from '@modules/asset';
import { BaseRepository } from '@modules/base';

@injectable()
export class SymbolRepository extends BaseRepository<SymbolEntity> {

    async createNew(name: string, asset: AssetEntity) {
        const newSymbol: SymbolEntity = new SymbolEntity();
        newSymbol.name = name;
        newSymbol.asset = asset;

        await this.save(newSymbol);
        return newSymbol;
    }

    async fetchSymbols() {
        const symbols = await this.find({
            relations: [
                'asset'
            ]
        });
        return symbols;
    }

    async updateSymbol(symbol_id: number, symbolDTO: Partial<SymbolDTO>) {
        return this.update(symbol_id, symbolDTO);
    }

}
