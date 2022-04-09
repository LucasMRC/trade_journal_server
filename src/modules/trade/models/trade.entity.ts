import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne
} from 'typeorm';

// Modules
import { BaseEntity } from '@modules/base/base.entity';
import { OutcomeEntity } from '@modules/outcome';
import { SymbolEntity } from '@modules/symbol';
import { PlatformEntity } from '@modules/platform';
import { TimeframeEntity } from '@modules/timeframe';
import { DateTransformer, DecimalTransformer } from '@utils/transformers';

@Entity('trade')
export class TradeEntity extends BaseEntity {
    @Column({
        nullable: true,
        transformer: new DateTransformer()
    })
        start_date: Date;

    @Column({
        nullable: true,
        transformer: new DateTransformer()
    })
        end_date: Date;

    @JoinColumn({ name: 'symbol_id' })
    @ManyToOne(() => SymbolEntity)
        symbol: SymbolEntity;

    @JoinColumn({ name: 'outcome_id' })
    @ManyToOne(() => OutcomeEntity)
        outcome: OutcomeEntity;

    @JoinColumn({ name: 'platform_id' })
    @ManyToOne(() => PlatformEntity)
        platform: PlatformEntity;

    @JoinColumn({ name: 'timeframe_id' })
    @ManyToOne(() => TimeframeEntity)
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
        scale: 2,
        transformer: new DecimalTransformer()
    })
        lote: number;
}