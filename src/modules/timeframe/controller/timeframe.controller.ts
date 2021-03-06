
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

// Modules
import { TimeframeDTO, TimeframeService } from '@modules/timeframe';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export const createNewTimeframe = async (req: Request, res: Response, next: NextFunction) => {
    const timeframeDTO: TimeframeDTO = req.body;
    const timeframeService = container.resolve(TimeframeService);
    try {
        const response = await timeframeService.createNewTimeframe(timeframeDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const getTimeframes = async (_req: Request, res: Response, next: NextFunction) => {
    const timeframeService = container.resolve(TimeframeService);
    try {
        const response = await timeframeService.getTimeframes();
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const deleteTimeframe = async (req: Request, res: Response, next: NextFunction) => {
    const { id: timeframe_id } = req.params;
    const id_as_number = Number(timeframe_id);
    if (!id_as_number) throw new ErrorWithStatus(400, 'Timeframe id is not a valid number');

    const timeframeService = container.resolve(TimeframeService);
    try {
        const response = await timeframeService.deleteTimeframe(id_as_number);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};

/* TODO: Add find filters */
export const updateTimeframe = async (req: Request, res: Response, next: NextFunction) => {
    const { id: timeframe_id } = req.params;
    const id_as_number = Number(timeframe_id);
    if (!id_as_number) throw new ErrorWithStatus(400, 'Timeframe id is not a valid number');

    const timeframeDTO: Partial<TimeframeDTO> = req.body;
    const timeframeService = container.resolve(TimeframeService);
    try {
        const response = await timeframeService.udpateTimeframe(id_as_number, timeframeDTO);
        res.send(response);
    } catch(ex: unknown) {
        next(ex);
    }
};