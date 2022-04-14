import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@modules/base';

@Entity('currency')
export class CurrencyEntity extends BaseEntity {
    @Column()
        name: string;
}