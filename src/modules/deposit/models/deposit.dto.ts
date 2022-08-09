import { ObjectNotValidError } from '@utils/errors';

export class DepositDTO {
    amount: number;
    date?: Date;
    platform_id: number;
}

export function assertIsDepositDTO(deposit: unknown): asserts deposit is DepositDTO {
    if (
        typeof deposit !== 'object'
        || deposit === null
        || !('amount' in deposit)
        || !('platform_id' in deposit)
    ) {
        throw new ObjectNotValidError('Invalid deposit.');
    }
}