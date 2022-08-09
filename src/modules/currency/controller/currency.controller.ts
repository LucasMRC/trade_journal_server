
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { CurrencyDTO, CurrencyService, assertIsCurrencyDTO } from '@modules/currency';

// Errors
import { ObjectNotValidError } from '@utils/errors';

export const createNewCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const currencyDTO = req.body;
    const currencyService = container.resolve(CurrencyService);

    try {
        assertIsCurrencyDTO(currencyDTO);
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
    const currencyService = container.resolve(CurrencyService);

    try {
        const id_as_number = Number(currency_id);
        if (!id_as_number) throw new ObjectNotValidError('Currency id is not a valid number.');

        const response = await currencyService.deleteCurrency(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateCurrency = async (req: Request, res: Response, next: NextFunction) => {
    const { id: currency_id } = req.params;
    const currencyDTO: Partial<CurrencyDTO> = req.body;
    const currencyService = container.resolve(CurrencyService);

    try {
        const id_as_number = Number(currency_id);
        if (!id_as_number) throw new ObjectNotValidError('Currency id is not a valid number.');

        const response = await currencyService.udpateCurrency(id_as_number, currencyDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};