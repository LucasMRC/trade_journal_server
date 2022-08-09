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
import { DecimalTransformer, DateTransformer } from '@utils/transformers';

@Entity('deposit')
export class DepositEntity extends BaseEntity {
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
    @ManyToOne(() => PlatformEntity, platform => platform.deposits)
        platform: PlatformEntity;
}