import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { SymbolEntity, SymbolDTO } from '@modules/symbol';
import { AssetEntity } from '@modules/asset';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(SymbolEntity)
export class SymbolRepository extends Repository<SymbolEntity> {

    async createNew(symbol_name: string, asset: AssetEntity) {
        const newSymbol: SymbolEntity = new SymbolEntity(symbol_name, asset);
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

    async deleteSymbol(symbol_id: number) {
        const symbol = this.findOne(symbol_id);
        if (!symbol) throw new ErrorWithStatus(`Symbol with id ${symbol_id} does not exist`, 400);

        return this.softDelete(symbol_id);
    }

    async updateSymbol(symbol_id: number, symbolDTO: Partial<SymbolDTO>) {
        const symbol = this.findOne(symbol_id);
        if (!symbol) throw new ErrorWithStatus(`Symbol with id ${symbol_id} does not exist`, 400);

        return this.update(symbol_id, symbolDTO);
    }

}
