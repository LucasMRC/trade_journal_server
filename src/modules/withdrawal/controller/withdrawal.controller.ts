
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { WithdrawalDTO, WithdrawalService, assertIsWithdrawalDTO } from '@modules/withdrawal';

// Errors
import { ObjectNotValidError } from '@utils/errors';

export const createNewWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
    const withdrawalDTO = req.body;
    const withdrawalService = container.resolve(WithdrawalService);

    try {
        assertIsWithdrawalDTO(withdrawalDTO);
        const response = await withdrawalService.createNewWithdrawal(withdrawalDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const getWithdrawals = async (_req: Request, res: Response, next: NextFunction) => {
    const withdrawalService = container.resolve(WithdrawalService);

    try {
        const response = await withdrawalService.getWithdrawals();
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const deleteWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
    const { id: withdrawal_id } = req.params;
    const withdrawalService = container.resolve(WithdrawalService);

    try {
        const id_as_number = Number(withdrawal_id);
        if (!id_as_number) throw new ObjectNotValidError('Withdrawal id is not a valid number.');

        const response = await withdrawalService.deleteWithdrawal(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
    const { id: withdrawal_id } = req.params;
    const withdrawalDTO: Partial<WithdrawalDTO> = req.body;
    const withdrawalService = container.resolve(WithdrawalService);

    try {
        const id_as_number = Number(withdrawal_id);
        if (!id_as_number) throw new ObjectNotValidError('Withdrawal id is not a valid number.');

        const response = await withdrawalService.udpateWithdrawal(id_as_number, withdrawalDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};