import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';

@Entity('platform')
export class PlatformEntity extends BaseEntity {
    @Column()
        name: string;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2
    })
        initialAmount: number;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2
    })
        currentAmount: number;
}