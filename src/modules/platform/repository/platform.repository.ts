import { EntityRepository } from 'typeorm';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';

// Modules
import { PlatformEntity, PlatformDTO } from '@modules/platform';
import { BaseRepository } from '@modules/base';

// Utils
import ErrorWithStatus from '@src/utils/errors/ErrorWithStatus';

@injectable()
@EntityRepository(PlatformEntity)
export class PlatformRepository extends BaseRepository<PlatformEntity> {

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

    async updatePlatform(platform_id: number, platformDTO: Partial<PlatformDTO>) {
        const platform = this.findOne(platform_id);
        if (!platform) throw new ErrorWithStatus(404, `Platform with id ${platform_id} does not exist`);
        await this.update(platform_id, platformDTO);

        const updatedPlatform = this.findOne(platform_id);
        return instanceToInstance(updatedPlatform);
    }
}