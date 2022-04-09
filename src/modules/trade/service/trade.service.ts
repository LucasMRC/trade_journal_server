import { injectable, container } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    TradeDTO,
    TradeRepository
} from '@modules/trade';
import { PlatformService } from '@modules/platform';
import { TimeframeService } from '@modules/timeframe';
import { SymbolService } from '@modules/symbol';

@injectable()
export class TradeService {

    private tradeRepository: TradeRepository;
    private readonly platformService: PlatformService;
    private readonly timeframeService: TimeframeService;
    private readonly symbolService: SymbolService;

    constructor() {
        this.tradeRepository = getCustomRepository(TradeRepository);
        this.platformService = container.resolve(PlatformService);
        this.timeframeService = container.resolve(TimeframeService);
        this.symbolService = container.resolve(SymbolService);
    }

    async createNewTrade(tradeDTO: TradeDTO) {
        const platform = await this.platformService.getPlatformOrFail(tradeDTO.platform_id);
        const timeframe = await this.timeframeService.getTimeframeOrFail(tradeDTO.timeframe_id);
        const symbol = await this.symbolService.getSymbolOrFail(tradeDTO.symbol_id);

        const trade = await this.tradeRepository.createNew(tradeDTO, platform, symbol, timeframe);
        return trade;
    }

    async getTrades() {
        const trades = await this.tradeRepository.fetchTrades();
        return trades;
    }

    async udpateTrade(trade_id: number, tradeDTO: Partial<TradeDTO>) {
        return await this.tradeRepository.updateTrade(trade_id, tradeDTO);
    }

    async deleteTrade(trade_id: number) {
        return await this.tradeRepository.deleteTrade(trade_id);
    }
}