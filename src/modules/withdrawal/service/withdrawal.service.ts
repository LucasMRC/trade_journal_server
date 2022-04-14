import { injectable, container } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

// Modules
import {
    WithdrawalDTO,
    WithdrawalRepository
} from '@modules/withdrawal';
import { PlatformService } from '@modules/platform';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

@injectable()
export class WithdrawalService {

    private withdrawalRepository: WithdrawalRepository;
    private platformService: PlatformService;

    constructor() {
        this.withdrawalRepository = getCustomRepository(WithdrawalRepository);
        this.platformService = container.resolve(PlatformService);
    }

    async createNewWithdrawal(withdrawalDTO: WithdrawalDTO) {
        const platform = await this.platformService.getPlatformOrFail(withdrawalDTO.platform_id);

        if (platform.current_amount < withdrawalDTO.amount)
            throw new ErrorWithStatus(`The platform ${platform.name} doesn't have enough funds to withdraw ${withdrawalDTO.amount}`, 400);

        /* Update current amount in the platform entity */
        platform.current_amount -= withdrawalDTO.amount;
        await this.platformService.updatePlatform(platform.id, platform);

        const withdrawal = await this.withdrawalRepository.createNew(withdrawalDTO, platform);
        return withdrawal;
    }

    async getWithdrawals() {
        const withdrawals = await this.withdrawalRepository.fetchWithdrawals();
        return withdrawals;
    }

    async udpateWithdrawal(withdrawal_id: number, withdrawalDTO: Partial<WithdrawalDTO>) {
        return await this.withdrawalRepository.updateWithdrawal(withdrawal_id, withdrawalDTO);
    }

    async deleteWithdrawal(withdrawal_id: number) {
        return await this.withdrawalRepository.deleteWithdrawal(withdrawal_id);
    }

}