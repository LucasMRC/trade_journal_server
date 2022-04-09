import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { TradeEntity, TradeDTO } from '@modules/trade';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';
import { PlatformEntity } from '@modules/platform/';
import { SymbolEntity } from '../../symbol/models/symbol.entity';
import { TimeframeEntity } from '../../timeframe/models/timeframe.entity';

@injectable()
@EntityRepository(TradeEntity)
export class TradeRepository extends Repository<TradeEntity> {

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

    async fetchTrades() {
        const trades = await this.find();
        return instanceToInstance(trades);
    }

    async deleteTrade(trade_id: number) {
        const trade = this.findOne(trade_id);
        if (!trade) throw new ErrorWithStatus(`Trade with id ${trade_id} does not exist`, 400);

        return this.softDelete(trade_id);
    }

    async updateTrade(trade_id: number, tradeDTO: Partial<TradeDTO>) {
        const trade = this.findOne(trade_id);
        if (!trade) throw new ErrorWithStatus(`Trade with id ${trade_id} does not exist`, 400);

        return this.update(trade_id, tradeDTO);
    }
}
