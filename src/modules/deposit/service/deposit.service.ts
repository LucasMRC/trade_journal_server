import { injectable, container } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    DepositDTO,
    DepositRepository
} from '@modules/deposit';
import { PlatformService } from '@modules/platform';

@injectable()
export class DepositService {

    private depositRepository: DepositRepository;
    private readonly platformService: PlatformService;

    constructor() {
        this.depositRepository = getCustomRepository(DepositRepository);
        this.platformService = container.resolve(PlatformService);
    }

    async createNewDeposit(depositDTO: DepositDTO) {
        const platform = await this.platformService.getPlatformOrFail(depositDTO.platform_id);
        /* Update current amount in the platform */
        platform.current_amount += depositDTO.amount;
        await this.platformService.updatePlatform(platform.id, platform);

        const deposit = await this.depositRepository.createNew(depositDTO, platform);
        return deposit;
    }

    async getDeposits() {
        const deposits = await this.depositRepository.fetchDeposits();
        return deposits;
    }

    async udpateDeposit(deposit_id: number, depositDTO: Partial<DepositDTO>) {
        return await this.depositRepository.updateDeposit(deposit_id, depositDTO);
    }

    async deleteDeposit(deposit_id: number) {
        return await this.depositRepository.deleteDeposit(deposit_id);
    }

}