import { ObjectNotValidError } from '@utils/errors';

export class SymbolDTO {
    name: string;
    asset_id: number;
}

export function assertIsSymbolDTO(symbol: unknown): asserts symbol is SymbolDTO {
    if (
        typeof symbol !== 'object'
        || symbol === null
        || !('name' in symbol)
        || !('asset_id' in symbol)
    ) throw new ObjectNotValidError('Invalid symbol.');
}