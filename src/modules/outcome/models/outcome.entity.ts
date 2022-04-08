import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@modules/base/base.entity';

@Entity('outcome')
export class OutcomeEntity extends BaseEntity {
    @Column()
        name: string;
}