import { injectable, container } from 'tsyringe';
import { connection } from 'App';

// Modules
import {
    TradeDTO,
    TradeRepository,
    TradeEntity
} from '@modules/trade';
import { PlatformService } from '@modules/platform';
import { TimeframeService } from '@modules/timeframe';
import { SymbolService } from '@modules/symbol';
import { BaseService } from '@modules/base';

@injectable()
export class TradeService extends BaseService<TradeEntity> {

    private tradeRepository: TradeRepository;
    private readonly platformService: PlatformService;
    private readonly timeframeService: TimeframeService;
    private readonly symbolService: SymbolService;

    constructor() {
        super(TradeEntity);
        this.tradeRepository = new TradeRepository(
            TradeEntity,
            connection.createEntityManager()
        );
        this.platformService = container.resolve(PlatformService);
        this.timeframeService = container.resolve(TimeframeService);
        this.symbolService = container.resolve(SymbolService);
    }

    async createNewTrade(tradeDTO: TradeDTO) {
        const platform = await this.platformService.findOneOrFail(tradeDTO.platform_id);
        const timeframe = await this.timeframeService.findOneOrFail(tradeDTO.timeframe_id);
        const symbol = await this.symbolService.findOneOrFail(tradeDTO.symbol_id);

        const trade = await this.tradeRepository.createNew(tradeDTO, platform, symbol, timeframe);
        return trade;
    }

    async getTrades() {
        const trades = await this.findAll();
        return trades;
    }

    async udpateTrade(trade_id: number, tradeDTO: Partial<TradeDTO>) {
        this.findOneOrFail(trade_id);

        return await this.tradeRepository.updateTrade(trade_id, tradeDTO);
    }

    async deleteTrade(trade_id: number) {
        return await this.delete(trade_id);
    }
}