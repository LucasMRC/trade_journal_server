import { getCustomRepository } from 'typeorm';
import { injectable } from 'tsyringe';

// Modules
import { PlatformDTO, PlatformRepository } from '@modules/platform';

// Utils
import ErrorWithStatus from '@src/utils/errors/ErrorWithStatus';

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

    async updatePlatform(platform_id: number, platformDTO: Partial<PlatformDTO>) {
        const updatedPlatform = await this.platformRepository.updatePlatform(platform_id, platformDTO);
        return updatedPlatform;
    }

    async deletePlatform(platform_id: number) {
        return await this.platformRepository.deletePlatform(platform_id);
    }

    async getPlatformOrFail(platform_id: number) {
        return await this.platformRepository.findOneOrFail(platform_id);
    }

    private async failIfPlatformNameIsNotAvailable(platform_name: string) {
        const platform = await this.platformRepository.findOne({
            where: {
                name: platform_name
            }
        });

        if (platform) throw new ErrorWithStatus(`There's already a platform named ${platform_name}`, 400);
    }

}