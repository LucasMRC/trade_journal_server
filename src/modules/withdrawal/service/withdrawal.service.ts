import { injectable, container } from 'tsyringe';
import { connection } from 'App';

// Modules
import {
    WithdrawalDTO,
    WithdrawalRepository,
    WithdrawalEntity
} from '@modules/withdrawal';
import { PlatformService } from '@modules/platform';
import { BaseService } from '@modules/base';

// Errors
import { ObjectNotValidError } from '@utils/errors';

@injectable()
export class WithdrawalService extends BaseService<WithdrawalEntity> {

    private withdrawalRepository: WithdrawalRepository;
    private platformService: PlatformService;

    constructor() {
        super(WithdrawalEntity);
        this.withdrawalRepository = new WithdrawalRepository(
            WithdrawalEntity,
            connection.createEntityManager()
        );
        this.platformService = container.resolve(PlatformService);
    }

    async createNewWithdrawal(withdrawalDTO: WithdrawalDTO) {
        const platform = await this.platformService.findOneOrFail(withdrawalDTO.platform_id);

        if (platform.current_amount < withdrawalDTO.amount)
            throw new ObjectNotValidError(`The platform ${platform.name} doesn't have enough funds to withdraw ${withdrawalDTO.amount}.`);

        /* Update current amount in the platform entity */
        platform.current_amount -= withdrawalDTO.amount;
        await this.platformService.updatePlatform(platform.id, platform);

        const withdrawal = await this.withdrawalRepository.createNew(withdrawalDTO, platform);
        return withdrawal;
    }

    async deleteWithdrawal(withdrawal_id: number) {
        return await this.delete(withdrawal_id);
    }

    async getWithdrawals() {
        const withdrawals = await this.findAll();
        return withdrawals;
    }

    async udpateWithdrawal(withdrawal_id: number, withdrawalDTO: Partial<WithdrawalDTO>) {
        this.findOneOrFail(withdrawal_id);
        return await this.withdrawalRepository.updateWithdrawal(withdrawal_id, withdrawalDTO);
    }

}