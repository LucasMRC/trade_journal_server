import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { PlatformRepository } from '../repository/platform.repository';

@injectable()
export class PlatformService {
    private repository: PlatformRepository;

    constructor() {
        this.repository = getCustomRepository(PlatformRepository);
    }

    public getPlatforms() {
        return this.repository.find();
    }
}