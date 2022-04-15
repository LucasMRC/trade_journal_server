import { EntityRepository } from 'typeorm';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { SymbolEntity, SymbolDTO } from '@modules/symbol';
import { AssetEntity } from '@modules/asset';
import { BaseRepository } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(SymbolEntity)
export class SymbolRepository extends BaseRepository<SymbolEntity> {

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

    async updateSymbol(symbol_id: number, symbolDTO: Partial<SymbolDTO>) {
        const symbol = this.findOne(symbol_id);
        if (!symbol) throw new ErrorWithStatus(404, `Symbol with id ${symbol_id} does not exist`);

        return this.update(symbol_id, symbolDTO);
    }

}
