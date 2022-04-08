import ErrorWithStatus from '@src/utils/errors/ErrorWithStatus';
import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { PlatformDTO } from '../models/platform.dto';
import { PlatformRepository } from '../repository/platform.repository';
import { DepositDTO } from '@modules/deposit';
import { WithdrawalDTO } from '@src/modules/withdrawal';

@injectable()
export class PlatformService {

    private platformRepository: PlatformRepository;

    constructor() {
        this.platformRepository = getCustomRepository(PlatformRepository);
    }

    async createNewPlatform(platformDTO: PlatformDTO) {
        const { name } = platformDTO;
        await this.failIfPlatformNameIsNotAvailable(name);

        const platform = await this.platformRepository.createNew(platformDTO);
        return platform;
    }

    async getPlatforms() {
        const platforms = await this.platformRepository.fetchPlatforms();
        return platforms;
    }

    async updatePlatform(platformId: number, platformDTO: Partial<PlatformDTO>) {
        const updatedPlatform = await this.platformRepository.updatePlatform(platformId, platformDTO);
        return updatedPlatform;
    }

    async deletePlatform(platformId: number) {
        return await this.platformRepository.deletePlatform(platformId);
    }

    async findPlatformFromDTOOrFail(dto: DepositDTO | WithdrawalDTO) {
        const { platformId } = dto;

        return await this.platformRepository.findOneOrFail(platformId);
    }

    private async failIfPlatformNameIsNotAvailable(platformName: string) {
        const platform = await this.platformRepository.findOne({
            where: {
                name: platformName
            }
        });

        if (platform) throw new ErrorWithStatus(`There's already a platform named ${platformName}`, 400);
    }

}