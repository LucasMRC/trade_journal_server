import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

// Modules
import { BaseEntity } from '@modules/base';
import { TradeEntity } from '@modules/trade';
import { PlatformEntity } from '@modules/platform';

// Utils
import { DateTransformer } from '@utils/transformers';

@Entity('blow_up')
export class BlowUpEntity extends BaseEntity {
    @Column({
        nullable: true,
        transformer: new DateTransformer()
    })
        date: Date;

    @JoinColumn()
    @OneToOne(() => TradeEntity)
        trade: TradeEntity;

    @JoinColumn()
    @ManyToOne(() => PlatformEntity)
        platform: PlatformEntity;
}