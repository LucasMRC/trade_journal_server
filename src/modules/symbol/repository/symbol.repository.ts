import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { SymbolEntity, SymbolDTO } from '@modules/symbol';
import { AssetEntity } from '@modules/asset';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
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
