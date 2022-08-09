
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { OutcomeDTO, OutcomeService, assertIsOutcomeDTO } from '@modules/outcome';

// Errors
import { ObjectNotValidError } from '@utils/errors';

export const createNewOutcome = async (req: Request, res: Response, next: NextFunction) => {
    const outcomeDTO = req.body;
    const outcomeService = container.resolve(OutcomeService);

    try {
        assertIsOutcomeDTO(outcomeDTO);
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
    const { id: outcome_id } = req.params;
    const outcomeService = container.resolve(OutcomeService);

    try {
        const id_as_number = Number(outcome_id);
        if (!id_as_number) throw new ObjectNotValidError('Outcome id is not a valid number.');

        const response = await outcomeService.deleteOutcome(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateOutcome = async (req: Request, res: Response, next: NextFunction) => {
    const { id: outcome_id } = req.params;
    const outcomeDTO: Partial<OutcomeDTO> = req.body;
    const outcomeService = container.resolve(OutcomeService);

    try {
        const id_as_number = Number(outcome_id);
        if (!id_as_number) throw new ObjectNotValidError('Outcome id is not a valid number.');

        const response = await outcomeService.udpateOutcome(id_as_number, outcomeDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};