
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { CurrencyDTO, CurrencyService } from '@modules/currency';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export const createNewCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const currencyDTO: CurrencyDTO = req.body;
    const currencyService = container.resolve(CurrencyService);
    try {
        const response = await currencyService.createNewCurrency(currencyDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const getCurrencies = async (_req: Request, res: Response, next: NextFunction) => {
    const currencyService = container.resolve(CurrencyService);
    try {
        const response = await currencyService.getCurrencies();
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const deleteCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const { id: currency_id } = req.params;
    const id_as_number = Number(currency_id);
    if (!id_as_number) throw new ErrorWithStatus(400, 'Currency id is not a valid number');

    const currencyService = container.resolve(CurrencyService);
    try {
        const response = await currencyService.deleteCurrency(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const { id: currency_id } = req.params;
    const id_as_number = Number(currency_id);
    if (!id_as_number) throw new ErrorWithStatus(400, 'Currency id is not a valid number');

    const currencyDTO: Partial<CurrencyDTO> = req.body;
    const currencyService = container.resolve(CurrencyService);
    try {
        const response = await currencyService.udpateCurrency(id_as_number, currencyDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};