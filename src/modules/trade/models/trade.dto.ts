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
}