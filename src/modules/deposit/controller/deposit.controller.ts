
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { DepositDTO, DepositService, assertIsDepositDTO } from '@modules/deposit';

// Errors
import { ObjectNotValidError } from '@utils/errors';

export const createNewDeposit = async (req: Request, res: Response, next: NextFunction) => {
    const depositDTO = req.body;
    const depositService = container.resolve(DepositService);

    try {
        assertIsDepositDTO(depositDTO);
        const response = await depositService.createNewDeposit(depositDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const getDeposits = async (_req: Request, res: Response, next: NextFunction) => {
    const depositService = container.resolve(DepositService);

    try {
        const response = await depositService.getDeposits();
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const deleteDeposit = async (req: Request, res: Response, next: NextFunction) => {
    const { id: deposit_id } = req.params;
    const depositService = container.resolve(DepositService);

    try {
        const id_as_number = Number(deposit_id);
        if (!id_as_number) throw new ObjectNotValidError('Deposit id is not a valid number.');

        const response = await depositService.deleteDeposit(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateDeposit = async (req: Request, res: Response, next: NextFunction) => {
    const { id: deposit_id } = req.params;
    const depositDTO: Partial<DepositDTO> = req.body;
    const depositService = container.resolve(DepositService);

    try {
        const id_as_number = Number(deposit_id);
        if (!id_as_number) throw new ObjectNotValidError('Deposit id is not a valid number.');

        const response = await depositService.udpateDeposit(id_as_number, depositDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};