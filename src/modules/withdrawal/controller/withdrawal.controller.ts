
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { WithdrawalDTO, WithdrawalService } from '@modules/withdrawal';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export const createNewWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
    const withdrawalDTO: WithdrawalDTO = req.body;
    const withdrawalService = container.resolve(WithdrawalService);
    try {
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
    const id_as_number = Number(withdrawal_id);
    if (!id_as_number) throw new ErrorWithStatus(400, 'Withdrawal id is not a valid number');

    const withdrawalService = container.resolve(WithdrawalService);
    try {
        const response = await withdrawalService.deleteWithdrawal(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
    const { id: withdrawal_id } = req.params;
    const id_as_number = Number(withdrawal_id);
    if (!id_as_number) throw new ErrorWithStatus(400, 'Withdrawal id is not a valid number');

    const withdrawalDTO: Partial<WithdrawalDTO> = req.body;
    const withdrawalService = container.resolve(WithdrawalService);
    try {
        const response = await withdrawalService.udpateWithdrawal(id_as_number, withdrawalDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};