import { ObjectNotValidError } from '@utils/errors';

export class TradeDTO {
    start_date: string;
    symbol_id: number;
    platform_id: number;
    timeframe_id: number;
    reason: string;
    comments: string;
    entry_price: number;
    stop_loss: number;
    take_profit: number;
    snapshot: string;
    lote: number;
    end_date?: string;
    outcome_id?: number;
    currency_id?: number;
}

export function assertIsTradeDTO(trade: unknown): asserts trade is TradeDTO {
    if (
        typeof trade !== 'object'
        || trade === null
        || !('start_date' in trade)
        || !('symbol_id' in trade)
        || !('platform_id' in trade)
        || !('timeframe_id' in trade)
        || !('reason' in trade)
        || !('comments' in trade)
        || !('entry_price' in trade)
        || !('stop_loss' in trade)
        || !('take_profit' in trade)
        || !('snapshot' in trade)
        || !('lote' in trade)
    ) {
        throw new ObjectNotValidError('Invalid trade.');
    }
}