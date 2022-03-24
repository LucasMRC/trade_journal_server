import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { PlatformEntity } from '../../platform/models/platform.entity';

@Entity('deposit')
export class DepositEntity extends BaseEntity {
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
        amount: number;

    @Column()
        date: Date;

    @JoinColumn()
    @OneToOne(() => PlatformEntity)
        platform: PlatformEntity;
}