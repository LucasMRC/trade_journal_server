import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { OutcomeEntity } from '../../outcome/models/outcome.entity';
import { SymbolEntity } from '../../symbol/models/symbol.entity';
import { PlatformEntity } from '../../platform/models/platform.entity';
import { TimeframeEntity } from '../../timeframe/models/timeframe.entity';

@Entity('trade')
export class TradeEntity extends BaseEntity {
    @Column()
        start_date: Date;

    @Column()
        end_date: Date;

    @JoinColumn()
    @OneToOne(() => SymbolEntity)
        symbol: SymbolEntity;

    @JoinColumn()
    @OneToOne(() => OutcomeEntity)
        outcome: OutcomeEntity;

    @JoinColumn()
    @OneToOne(() => PlatformEntity)
        platform: PlatformEntity;

    @JoinColumn()
    @OneToOne(() => TimeframeEntity)
        timeframe: TimeframeEntity;

    @Column({ type: 'longtext' })
        reason: string;

    @Column({
        type: 'longtext',
        nullable: true
    })
        comments: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8
    })
        entry_price: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8
    })
        stop_loss: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 8
    })
        take_profit: number;

    @Column()
        snapshot: string;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2
    })
        lote: number;
}