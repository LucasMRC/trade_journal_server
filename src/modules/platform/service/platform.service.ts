import { getCustomRepository } from 'typeorm';
import { injectable } from 'tsyringe';

// Modules
import { PlatformDTO, PlatformRepository, PlatformEntity } from '@modules/platform';

// Utils
import ErrorWithStatus from '@src/utils/errors/ErrorWithStatus';
import { BaseService } from '@modules/base';

@injectable()
export class PlatformService extends BaseService<PlatformEntity> {

    private platformRepository: PlatformRepository;

    constructor() {
        super(getCustomRepository(PlatformRepository));
    }

    async createNewPlatform(platformDTO: PlatformDTO) {
        const { name } = platformDTO;
        await this.failIfPlatformNameIsNotAvailable(name);

        const platform = await this.platformRepository.createNew(platformDTO);
        return platform;
    }

    async getPlatforms() {
        const platforms = await this.findAll();
        return platforms;
    }

    async deletePlatform(platform_id: number) {
        return await this.delete(platform_id);
    }

    async updatePlatform(platform_id: number, platformDTO: Partial<PlatformDTO>) {
        const updatedPlatform = await this.platformRepository.updatePlatform(platform_id, platformDTO);
        return updatedPlatform;
    }

    private async failIfPlatformNameIsNotAvailable(platform_name: string) {
        const platform = await this.platformRepository.findOne({
            where: {
                name: platform_name
            }
        });

        if (platform) throw new ErrorWithStatus(400, `There's already a platform named ${platform_name}`);
    }

}