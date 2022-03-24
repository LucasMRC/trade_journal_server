import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';

@Entity('outcome')
export class OutcomeEntity extends BaseEntity {
    @Column()
        name: string;
}