import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@modules/base';

@Entity('timeframe')
export class TimeframeEntity extends BaseEntity {
    @Column()
        name: string;
}