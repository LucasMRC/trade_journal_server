import { EntityRepository, Repository } from 'typeorm';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { PlatformEntity, PlatformDTO } from '@modules/platform';

// Utils
import ErrorWithStatus from '@src/utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(PlatformEntity)
export class PlatformRepository extends Repository<PlatformEntity> {

    async createNew(platformDTO: PlatformDTO) {
        const newPlatform: PlatformEntity = await this.save(platformDTO);
        return plainToInstance(PlatformEntity, newPlatform);
    }

    async fetchPlatforms() {
        const platforms = await this.find();
        return instanceToInstance(platforms);
    }

    async deletePlatform(platformId: number) {
        const platform = this.findOne(platformId);
        if (!platform) throw new ErrorWithStatus(`Platform with id ${platformId} does not exist`, 400);

        return this.softDelete(platformId);
    }

    async updatePlatform(platformId: number, platformDTO: Partial<PlatformDTO>) {
        const platform = this.findOne(platformId);
        if (!platform) throw new ErrorWithStatus(`Platform with id ${platformId} does not exist`, 400);
        await this.update(platformId, platformDTO);

        const updatedPlatform = this.findOne(platformId);
        return instanceToInstance(updatedPlatform);
    }
}