import { Repository } from 'typeorm';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';
import { capitalize } from '@src/utils/functions';

export class BaseRepository<T> extends Repository<T> {

    async findByProperty(property: string, value: unknown): Promise<T | undefined> {
        try {
            return await this.findOne({
                where: {
                    [property]: value
                }
            });
        } catch (error) {
            throw new ErrorWithStatus(404, `${capitalize(this.metadata.tableName)} with ${property} ${value} was not found`);
        }
    }

}