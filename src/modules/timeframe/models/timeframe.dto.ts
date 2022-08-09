import { ObjectNotValidError } from '@utils/errors';

export class TimeframeDTO {
    name: string;
}

export function assertIsTimeframeDTO(timeframe: unknown): asserts timeframe is TimeframeDTO {
    if (
        typeof timeframe !== 'object'
        || timeframe === null
        || !('name' in timeframe)
    ) throw new ObjectNotValidError('Invalid timeframe.');
}