import { Request, Response, NextFunction } from 'express';
import { PlatformService } from '../service/platform.service';
import { container } from 'tsyringe';
import { PlatformDTO } from '../models/platform.dto';
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export const createNewPlatform = async (req: Request, res: Response, next: NextFunction) => {
    const platformDto: PlatformDTO = new PlatformDTO(req.body);
    const platformService = container.resolve(PlatformService);
    try {
        const response = await platformService.createNewPlatform(platformDto);
        res.send(response);
    } catch (ex) {
        next(ex);
    }
};

export const getAllPlatforms = async (_req: Request, res: Response) => {
    const platformService = container.resolve(PlatformService);

    const platforms = await platformService.getPlatforms();
    res.send(platforms);
};

export const deletePlatform = async (req: Request, res: Response, next: NextFunction) => {
    const { id: platformId } = req.params;
    const idAsNumber = Number(platformId);
    if (!idAsNumber) throw new ErrorWithStatus('Platform id is not a valid number', 400);

    const platformService = container.resolve(PlatformService);
    try {
        await platformService.deletePlatform(idAsNumber);
        res.send('deleted');
    } catch (ex) {
        next(ex);
    }
};

export const updatePlatform = async (req: Request, res: Response, next: NextFunction) => {
    const { id: platformId } = req.params;
    const platformDto: Partial<PlatformDTO> = req.body;

    const idAsNumber = Number(platformId);
    if (!idAsNumber) throw new ErrorWithStatus('Platform id is not a valid number', 400);

    const platformService = container.resolve(PlatformService);
    try {
        const response = await platformService.updatePlatform(idAsNumber, platformDto);
        res.send(response);
    } catch (ex) {
        next(ex);
    }
    const platforms = await platformService.getPlatforms();
    res.send({ platforms });
};
