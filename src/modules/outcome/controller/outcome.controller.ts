
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { OutcomeDTO, OutcomeService } from '@modules/outcome';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export const createNewOutcome = async (req: Request, res: Response, next: NextFunction) => {
    const outcomeDTO: OutcomeDTO = req.body;
    const outcomeService = container.resolve(OutcomeService);
    try {
        const response = await outcomeService.createNewOutcome(outcomeDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const getOutcomes = async (_req: Request, res: Response, next: NextFunction) => {
    const outcomeService = container.resolve(OutcomeService);
    try {
        const response = await outcomeService.getOutcomes();
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const deleteOutcome = async (req: Request, res: Response, next: NextFunction) => {
    const { id: outcomeId } = req.params;
    const idAsNumber = Number(outcomeId);
    if (!idAsNumber) throw new ErrorWithStatus('Outcome id is not a valid number', 400);

    const outcomeService = container.resolve(OutcomeService);
    try {
        const response = await outcomeService.deleteOutcome(idAsNumber);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateOutcome = async (req: Request, res: Response, next: NextFunction) => {
    const { id: outcomeId } = req.params;
    const idAsNumber = Number(outcomeId);
    if (!idAsNumber) throw new ErrorWithStatus('Outcome id is not a valid number', 400);

    const outcomeDTO: Partial<OutcomeDTO> = req.body;
    const outcomeService = container.resolve(OutcomeService);
    try {
        const response = await outcomeService.udpateOutcome(idAsNumber, outcomeDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};