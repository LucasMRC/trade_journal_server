import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';

// Modules
import { SymbolEntity } from '@modules/symbol/models/symbol.entity';
import { SymbolDTO } from '@modules/symbol/models/symbol.dto';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';
import { AssetEntity } from '../../asset/models/asset.entity';

@EntityRepository(SymbolEntity)
export class SymbolRepository extends Repository<SymbolEntity> {
    async createNew(symbolName: string, asset: AssetEntity) {
        const newSymbol: SymbolEntity = new SymbolEntity(symbolName, asset);
        await this.save(newSymbol);
        return instanceToInstance(newSymbol);
    }

    async fetchSymbols() {
        const symbols = await this.find({
            relations: [
                'asset'
            ]
        });
        return instanceToInstance(symbols);
    }

    async deleteSymbol(symbolId: number) {
        const symbol = this.findOne(symbolId);
        if (!symbol) throw new ErrorWithStatus(`Symbol with id ${symbolId} does not exist`, 400);

        return this.softDelete(symbolId);
    }

    async updateSymbol(symbolId: number, symbolDTO: Partial<SymbolDTO>) {
        const symbol = this.findOne(symbolId);
        if (!symbol) throw new ErrorWithStatus(`Symbol with id ${symbolId} does not exist`, 400);

        return this.update(symbolId, symbolDTO);
    }

}
