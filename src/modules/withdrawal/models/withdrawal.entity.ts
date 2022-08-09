import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne
} from 'typeorm';

// Modules
import { BaseEntity } from '@modules/base';
import { PlatformEntity } from '@modules/platform';

// Utils
import { DateTransformer, DecimalTransformer } from '@utils/transformers';

@Entity('withdrawal')
export class WithdrawalEntity extends BaseEntity {
    @Column({
        type: 'numeric',
        precision: 10,
        scale: 2,
        transformer: new DecimalTransformer()
    })
        amount: number;

    @Column({
        transformer: new DateTransformer()
    })
        date: Date;

    @JoinColumn({ name: 'platform_id' })
    @ManyToOne(() => PlatformEntity, platform => platform.withdrawals)
        platform: PlatformEntity;
}