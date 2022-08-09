import { Request, Response, NextFunction } from 'express';
import { PlatformService } from '../service/platform.service';
import { container } from 'tsyringe';

// Modules
import { assertIsPlatformDTO, PlatformDTO } from '@modules/platform';

// Errors
import { ObjectNotValidError } from '@utils/errors';

export const createNewPlatform = async (req: Request, res: Response, next: NextFunction) => {
    const platformDto = req.body;
    const platformService = container.resolve(PlatformService);

    try {
        assertIsPlatformDTO(platformDto);
        const response = await platformService.createNewPlatform(platformDto);
        res.send(response);
    } catch (ex) {
        next(ex);
    }
};

export const getAllPlatforms = async (_req: Request, res: Response, next: NextFunction) => {
    const platformService = container.resolve(PlatformService);

    try {
        const platforms = await platformService.getPlatforms();
        res.send(platforms);
    } catch (ex) {
        next(ex);
    }
};

export const deletePlatform = async (req: Request, res: Response, next: NextFunction) => {
    const { id: platform_id } = req.params;
    const platformService = container.resolve(PlatformService);

    try {
        const id_as_number = Number(platform_id);
        if (!id_as_number) throw new ObjectNotValidError('Platform id is not a valid number.');

        await platformService.deletePlatform(id_as_number);
        res.send('deleted');
    } catch (ex) {
        next(ex);
    }
};

export const updatePlatform = async (req: Request, res: Response, next: NextFunction) => {
    const { id: platform_id } = req.params;
    const platformDto: Partial<PlatformDTO> = req.body;
    const platformService = container.resolve(PlatformService);

    try {
        const id_as_number = Number(platform_id);
        if (!id_as_number) throw new ObjectNotValidError('Platform id is not a valid number.');

        const response = await platformService.updatePlatform(id_as_number, platformDto);
        res.send(response);
    } catch (ex) {
        next(ex);
    }
};
