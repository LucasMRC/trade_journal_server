
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

// Modules
import { TradeDTO, TradeService, assertIsTradeDTO } from '@modules/trade';

// Errors
import { ObjectNotValidError } from '@utils/errors';

export const createNewTrade = async (req: Request, res: Response, next: NextFunction) => {
    const tradeDTO = req.body;
    const tradeService = container.resolve(TradeService);

    try {
        assertIsTradeDTO(tradeDTO);
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
    const tradeService = container.resolve(TradeService);

    try {
        const id_as_number = Number(trade_id);
        if (!id_as_number) throw new ObjectNotValidError('Trade id is not a valid number.');

        const response = await tradeService.deleteTrade(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateTrade = async (req: Request, res: Response, next: NextFunction) => {
    const { id: trade_id } = req.params;
    const tradeDTO: Partial<TradeDTO> = req.body;
    const tradeService = container.resolve(TradeService);

    try {
        const id_as_number = Number(trade_id);
        if (!id_as_number) throw new ObjectNotValidError('Trade id is not a valid number.');

        const response = await tradeService.udpateTrade(id_as_number, tradeDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};