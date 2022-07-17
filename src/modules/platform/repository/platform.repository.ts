import { injectable } from 'tsyringe';

// Modules
import { PlatformEntity, PlatformDTO } from '@modules/platform';
import { BaseRepository } from '@modules/base';

@injectable()
export class PlatformRepository extends BaseRepository<PlatformEntity> {

    async createNew(platformDTO: PlatformDTO) {
        const { name, current_amount, initial_amount } = platformDTO;
        const newPlatform: PlatformEntity = this.create({
            name,
            initial_amount: initial_amount || 0,
            current_amount: current_amount || initial_amount || 0
        });
        await this.save(newPlatform);
        return newPlatform;
    }

    async updatePlatform(platform_id: number, platformDTO: Partial<PlatformDTO>) {
        await this.update(platform_id, platformDTO);
    }
}