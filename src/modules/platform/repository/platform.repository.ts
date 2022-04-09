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
        const { name, current_amount, initial_amount } = platformDTO;
        const newPlatform: PlatformEntity = this.create({
            name,
            initial_amount: initial_amount || 0,
            current_amount: current_amount || initial_amount || 0
        });
        await this.save(newPlatform);
        return plainToInstance(PlatformEntity, newPlatform);
    }

    async fetchPlatforms() {
        const platforms = await this.find();
        return instanceToInstance(platforms);
    }

    async deletePlatform(platform_id: number) {
        const platform = this.findOne(platform_id);
        if (!platform) throw new ErrorWithStatus(`Platform with id ${platform_id} does not exist`, 400);

        return this.softDelete(platform_id);
    }

    async updatePlatform(platform_id: number, platformDTO: Partial<PlatformDTO>) {
        const platform = this.findOne(platform_id);
        if (!platform) throw new ErrorWithStatus(`Platform with id ${platform_id} does not exist`, 400);
        await this.update(platform_id, platformDTO);

        const updatedPlatform = this.findOne(platform_id);
        return instanceToInstance(updatedPlatform);
    }
}