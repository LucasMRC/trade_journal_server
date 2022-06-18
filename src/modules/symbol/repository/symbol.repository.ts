import { EntityRepository } from 'typeorm';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { SymbolEntity, SymbolDTO } from '@modules/symbol';
import { AssetEntity } from '@modules/asset';
import { BaseRepository } from '@modules/base';

@injectable()
@EntityRepository(SymbolEntity)
export class SymbolRepository extends BaseRepository<SymbolEntity> {

    async createNew(symbol_name: string, asset: AssetEntity) {
        const newSymbol: SymbolEntity = new SymbolEntity();
        newSymbol.name = symbol_name;
        newSymbol.asset = asset;
        await this.save(newSymbol);
        return plainToInstance(SymbolEntity, newSymbol);
    }

    async fetchSymbols() {
        const symbols = await this.find({
            relations: [
                'asset'
            ]
        });
        return instanceToInstance(symbols);
    }

    async updateSymbol(symbol_id: number, symbolDTO: Partial<SymbolDTO>) {
        return this.update(symbol_id, symbolDTO);
    }

}
