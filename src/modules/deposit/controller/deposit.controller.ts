
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { DepositDTO, DepositService } from '@modules/deposit';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export const createNewDeposit = async (req: Request, res: Response, next: NextFunction) => {
    const depositDTO: DepositDTO = req.body;
    const depositService = container.resolve(DepositService);
    try {
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
    const { id: depositId } = req.params;
    const idAsNumber = Number(depositId);
    if (!idAsNumber) throw new ErrorWithStatus('Deposit id is not a valid number', 400);

    const depositService = container.resolve(DepositService);
    try {
        const response = await depositService.deleteDeposit(idAsNumber);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateDeposit = async (req: Request, res: Response, next: NextFunction) => {
    const { id: depositId } = req.params;
    const idAsNumber = Number(depositId);
    if (!idAsNumber) throw new ErrorWithStatus('Deposit id is not a valid number', 400);

    const depositDTO: Partial<DepositDTO> = req.body;
    const depositService = container.resolve(DepositService);
    try {
        const response = await depositService.udpateDeposit(idAsNumber, depositDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};