
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

// Modules
import { TradeDTO, TradeService } from '@modules/trade';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export const createNewTrade = async (req: Request, res: Response, next: NextFunction) => {
    const tradeDTO: TradeDTO = req.body;
    const tradeService = container.resolve(TradeService);
    try {
        const response = await tradeService.createNewTrade(tradeDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const getTrades = async (_req: Request, res: Response, next: NextFunction) => {
    const tradeService = container.resolve(TradeService);
    try {
        const response = await tradeService.getTrades();
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const deleteTrade = async (req: Request, res: Response, next: NextFunction) => {
    const { id: trade_id } = req.params;
    const id_as_number = Number(trade_id);
    if (!id_as_number) throw new ErrorWithStatus('Trade id is not a valid number', 400);

    const tradeService = container.resolve(TradeService);
    try {
        const response = await tradeService.deleteTrade(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateTrade = async (req: Request, res: Response, next: NextFunction) => {
    const { id: trade_id } = req.params;
    const id_as_number = Number(trade_id);
    if (!id_as_number) throw new ErrorWithStatus('Trade id is not a valid number', 400);

    const tradeDTO: Partial<TradeDTO> = req.body;
    const tradeService = container.resolve(TradeService);
    try {
        const response = await tradeService.udpateTrade(id_as_number, tradeDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};