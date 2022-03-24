import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';

@Entity('timeframe')
export class TimeframeEntity extends BaseEntity {
    @Column()
        name: string;
}