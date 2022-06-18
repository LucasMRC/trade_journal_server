import { instanceToInstance } from 'class-transformer';
import { FindOptionsWhere } from 'typeorm';
import { connection } from 'App';

// Modules
import {
    BaseRepository,
    BaseEntity
} from '@modules/base';

// Utils
import ErrorWithStatus from '@utils/errors/ErrorWithStatus';

export type ObjectType<T> = { new (): T } | (() => T);
export class BaseService<T extends BaseEntity> {

    private repository: BaseRepository<T>;
    private type: ObjectType<T>;

    constructor(type: ObjectType<T>) {
        this.type = type;
        this.repository = new BaseRepository(
            type,
            connection.createEntityManager()
        );
    }

    async findOne(entity_id: number): Promise<T | null> {
        const entity = this.repository.findOneBy({
            id: entity_id
        } as unknown as FindOptionsWhere<T>);

        return instanceToInstance(entity);
    }

    async delete(entity_id: number) {
        await this.findOneOrFail(entity_id);

        try {
            await this.repository.softDelete(entity_id);
            return `${this.type.name.replace('Entity', '')} was deleted`;
        } catch (ex: unknown) {
            console.log(ex);
            throw new ErrorWithStatus(400, `${this.type.name.replace('Entity', '')} could not be deleted`);
        }
    }

    async findOneOrFail(entity_id: number): Promise<T> {
        const entity = await this.findOne(entity_id);
        if (!entity) {
            throw new ErrorWithStatus(404, `${this.type.name.replace('Entity', '')} was not found`);
        }
        return entity;
    }

    async findAll(): Promise<T[]> {
        const entities = await this.repository.find();
        return instanceToInstance(entities);
    }

}