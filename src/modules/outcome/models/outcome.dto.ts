import { ObjectNotValidError } from '@utils/errors';

export class OutcomeDTO {
    name: string;
}

export function assertIsOutcomeDTO(outcome: unknown): asserts outcome is OutcomeDTO {
    if (
        typeof outcome !== 'object'
        || outcome === null
        || !('name' in outcome)
    ) {
        throw new ObjectNotValidError('Invalid outcome.');
    }
}