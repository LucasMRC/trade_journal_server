import { instanceToInstance } from 'class-transformer';

// Modules
import {
    BaseRepository,
    BaseEntity
} from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';
import { capitalize } from '@utils/functions';
import { FindOneOptions } from 'typeorm';

export class BaseService<T extends BaseEntity> {

    private entity_type: string;

    constructor(private readonly repository: BaseRepository<T>) {
        this.entity_type = capitalize(this.repository.metadata.tableName);
    }

    async findOne(entity_id: number): Promise<T | null> {
        return await this.repository.findOne({ id: entity_id } as FindOneOptions<T>);
    }

    async delete(entity_id: number) {
        await this.findOneOrFail(entity_id);

        try {
            await this.repository.softDelete(entity_id);
            return `${this.entity_type} with id ${entity_id} was deleted`;
        } catch (ex: unknown) {
            console.log(ex);
            throw new ErrorWithStatus(400, `${this.entity_type} with id ${entity_id} could not be deleted`);
        }
    }

    async findOneOrFail(entity_id: number): Promise<T> {
        const entity = await this.findOne(entity_id);
        if (!entity) {
            throw new ErrorWithStatus(404, `${this.entity_type} with id ${entity_id} was not found`);
        }
        return entity;
    }

    async findAll(): Promise<T[]> {
        const entities = await this.repository.find();
        return instanceToInstance(entities);
    }

}