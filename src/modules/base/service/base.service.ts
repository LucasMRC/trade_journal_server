// Modules
import {
    BaseRepository
} from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';
import { capitalize } from '@utils/functions';
import { instanceToInstance } from 'class-transformer';

export class BaseService<T> {

    private entity_type: string;

    constructor(private readonly repository: BaseRepository<T>) {
        this.entity_type = capitalize(this.repository.metadata.tableName);
    }

    async delete(entity_id: number) {
        const entity = this.repository.findOne(entity_id);
        if (!entity) throw new ErrorWithStatus(400, `${this.entity_type} with id ${entity_id} does not exist`);

        try {
            await this.repository.softDelete(entity_id);
            return `${this.entity_type} with id ${entity_id} was deleted`;
        } catch (ex: unknown) {
            console.log(ex);
            throw new ErrorWithStatus(400, `${this.entity_type} with id ${entity_id} could not be deleted`);
        }
    }

    async getOneOrFail(entity_id: number): Promise<T> {
        try {
            return await this.repository.findOneOrFail(entity_id);
        } catch (ex: unknown) {
            throw new ErrorWithStatus(404, `${this.entity_type} with id ${entity_id} was not found`);
        }
    }

    async findAll(): Promise<T[]> {
        const entities = await this.repository.find();
        return instanceToInstance(entities);
    }

}