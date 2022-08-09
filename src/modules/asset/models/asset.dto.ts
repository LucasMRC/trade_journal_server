import { ObjectNotValidError } from '@utils/errors';

export class AssetDTO {
    name: string;
}

export function assertIsAssetDTO(asset: unknown): asserts asset is AssetDTO {
    if (
        typeof asset !== 'object'
        || asset === null
        || !('name' in asset)
    ) {
        throw new ObjectNotValidError('Invalid asset.');
    }
}