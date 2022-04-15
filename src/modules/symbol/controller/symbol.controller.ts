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
    const { id: symbol_id } = req.params;
    const id_as_number = Number(symbol_id);
    if (!id_as_number) throw new ErrorWithStatus(400, 'Symbol id is not a valid number');

    const symbolService = await container.resolve(SymbolService);
    try {
        const response = await symbolService.deleteSymbol(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateSymbol = async (req: Request, res: Response, next: NextFunction) => {
    const { id: symbol_id } = req.params;
    const id_as_number = Number(symbol_id);
    if (!id_as_number) throw new ErrorWithStatus(400, 'Symbol id is not a valid number');

    const symbolDTO: Partial<SymbolDTO> = req.body;
    const symbolService = container.resolve(SymbolService);
    try {
        const response = await symbolService.udpateSymbol(id_as_number, symbolDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};