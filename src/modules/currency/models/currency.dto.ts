import { ObjectNotValidError } from '@utils/errors';

export class CurrencyDTO {
    name: string;
}

export function assertIsCurrencyDTO(currency: unknown): asserts currency is CurrencyDTO {
    if (
        typeof currency !== 'object'
        || currency === null
        || !('name' in currency)
    ) {
        throw new ObjectNotValidError('Invalid currency.');
    }
}