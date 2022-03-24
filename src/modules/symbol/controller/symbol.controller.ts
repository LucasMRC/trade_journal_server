import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { SymbolService } from '@modules/symbol';

export const createNewSymbol = async (req: Request, res: Response, next: NextFunction) => {
    const symbolService = container.resolve(SymbolService);
    const symbolDTO = req.body;
    try {
        const symbol = symbolService.createNewSymbol(symbolDTO);
        res.send(symbol);
    } catch(ex: unknown) {
        next(ex);
    }
};