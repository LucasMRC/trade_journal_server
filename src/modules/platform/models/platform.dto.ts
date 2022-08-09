import { ObjectNotValidError } from '@utils/errors';

export class PlatformDTO {
    name: string;
    initial_amount?: number;
    current_amount?: number;
}

export function assertIsPlatformDTO(platform: unknown): asserts platform is PlatformDTO {
    if (
        typeof platform !== 'object'
        || platform === null
        || !('name' in platform)
    ) {
        throw new ObjectNotValidError('Invalid platform.');
    }
}