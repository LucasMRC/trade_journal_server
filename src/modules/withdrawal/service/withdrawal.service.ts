import { injectable } from 'tsyringe';
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
    }

    async createNewWithdrawal(withdrawalDTO: WithdrawalDTO) {
        const platform = await this.platformService.findPlatformFromDTOOrFail(withdrawalDTO);

        if (platform.currentAmount < withdrawalDTO.amount)
            throw new ErrorWithStatus(`The platform ${platform.name} doesn't have enough funds to withdraw ${withdrawalDTO.amount}`, 400);

        const withdrawal = await this.withdrawalRepository.createNew(withdrawalDTO, platform);

        /* Update current amount in the platform entity */
        const currentAmount = platform.currentAmount - withdrawalDTO.amount;
        await this.platformService.updatePlatform(platform.id, { currentAmount });

        return withdrawal;
    }

    async getWithdrawals() {
        const withdrawals = await this.withdrawalRepository.fetchWithdrawals();
        return withdrawals;
    }

    async udpateWithdrawal(withdrawalId: number, withdrawalDTO: Partial<WithdrawalDTO>) {
        return await this.withdrawalRepository.updateWithdrawal(withdrawalId, withdrawalDTO);
    }

    async deleteWithdrawal(withdrawalId: number) {
        return await this.withdrawalRepository.deleteWithdrawal(withdrawalId);
    }

}