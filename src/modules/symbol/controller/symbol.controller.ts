import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { SymbolService, SymbolDTO } from '@modules/symbol';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export const createNewSymbol = async (req: Request, res: Response, next: NextFunction) => {
    const symbolDTO: SymbolDTO = req.body;
    const symbolService = container.resolve(SymbolService);
    try {
        const symbol = await symbolService.createNewSymbol(symbolDTO);
        res.send(symbol);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const getSymbols = async (_req: Request, res: Response, next: NextFunction) => {
    const symbolService = container.resolve(SymbolService);
    try {
        const response = await symbolService.getSymbols();
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const deleteSymbol = async (req: Request, res: Response, next: NextFunction) => {
    const { id: symbolId } = req.params;
    const idAsNumber = Number(symbolId);
    if (!idAsNumber) throw new ErrorWithStatus('Symbol id is not a valid number', 400);

    const symbolService = await container.resolve(SymbolService);
    try {
        const response = await symbolService.deleteSymbol(idAsNumber);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateSymbol = async (req: Request, res: Response, next: NextFunction) => {
    const { id: symbolId } = req.params;
    const idAsNumber = Number(symbolId);
    if (!idAsNumber) throw new ErrorWithStatus('Symbol id is not a valid number', 400);

    const symbolDTO: Partial<SymbolDTO> = req.body;
    const symbolService = container.resolve(SymbolService);
    try {
        const response = await symbolService.udpateSymbol(idAsNumber, symbolDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};