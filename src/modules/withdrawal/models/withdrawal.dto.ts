import { ObjectNotValidError } from '@utils/errors';

export class WithdrawalDTO {
    amount: number;
    date?: Date;
    platform_id: number;
}

export function assertIsWithdrawalDTO(withdrawal: WithdrawalDTO): asserts withdrawal is WithdrawalDTO {
    if (
        typeof withdrawal !== 'object'
        || withdrawal === null
        || !('amount' in withdrawal)
        || !('platform_id' in withdrawal)
    ) throw new ObjectNotValidError('Withdrawal amount is not a valid number.');
}