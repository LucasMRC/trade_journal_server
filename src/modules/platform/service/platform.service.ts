import { injectable } from 'tsyringe';
import { connection } from 'App';

// Modules
import { PlatformDTO, PlatformRepository, PlatformEntity } from '@modules/platform';
import { BaseService } from '@modules/base';

// Utils
import ErrorWithStatus from '@src/utils/errors/ErrorWithStatus';

@injectable()
export class PlatformService extends BaseService<PlatformEntity> {

    private platformRepository: PlatformRepository;

    constructor() {
        super(PlatformEntity);
        this.platformRepository = new PlatformRepository(
            PlatformEntity,
            connection.createEntityManager()
        );
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
        this.findOneOrFail(platform_id);

        await this.platformRepository.updatePlatform(platform_id, platformDTO);

        const updatedPlatform = this.findOne(platform_id);
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