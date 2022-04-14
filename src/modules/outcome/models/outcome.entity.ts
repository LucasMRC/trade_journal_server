import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@modules/base';

@Entity('outcome')
export class OutcomeEntity extends BaseEntity {
    @Column()
        name: string;
}