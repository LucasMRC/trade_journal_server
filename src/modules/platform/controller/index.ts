import { Request, Response } from 'express';
import { PlatformService } from '../service/platform.service';
import { container } from 'tsyringe';

export const getAllPlatfoms = async (_req: Request, res: Response) => {
    const platformService = container.resolve(PlatformService);

    const platforms = await platformService.getPlatforms();
    console.log({ platforms });
    res.send('logging plaforms');
};