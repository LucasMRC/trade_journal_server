import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { TradeEntity } from '../../trade/models/trade.entity';
import { PlatformEntity } from '../../platform/models/platform.entity';

@Entity('blow_up')
export class BlowUpEntity extends BaseEntity {
    @Column({ nullable: true })
        date: Date;

    @JoinColumn()
    @OneToOne(() => TradeEntity)
        trade: TradeEntity;

    @JoinColumn()
    @OneToOne(() => PlatformEntity)
        platform: PlatformEntity;
}