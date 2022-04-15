import { EntityRepository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { TradeEntity, TradeDTO } from '@modules/trade';
import { PlatformEntity } from '@modules/platform/';
import { SymbolEntity } from '@modules/symbol';
import { TimeframeEntity } from '@modules/timeframe';
import { BaseRepository } from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(TradeEntity)
export class TradeRepository extends BaseRepository<TradeEntity> {

    async createNew(tradeDTO: TradeDTO, platform: PlatformEntity, symbol: SymbolEntity, timeframe: TimeframeEntity) {
        const newTrade: TradeEntity = this.create({
            ...tradeDTO,
            platform,
            symbol,
            timeframe
        });
        await this.save(newTrade);
        return instanceToInstance(newTrade);
    }

    async updateTrade(trade_id: number, tradeDTO: Partial<TradeDTO>) {
        const trade = this.findOne(trade_id);
        if (!trade) throw new ErrorWithStatus(400, `Trade with id ${trade_id} does not exist`);

        return this.update(trade_id, tradeDTO);
    }
}
