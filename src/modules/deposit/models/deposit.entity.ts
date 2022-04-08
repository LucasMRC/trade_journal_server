import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne
} from 'typeorm';

// Modules
import { BaseEntity } from '@modules/base/base.entity';
import { PlatformEntity } from '@modules/platform';

// Utils
import { DecimalTransformer } from '@utils/transformers';

@Entity('deposit')
export class DepositEntity extends BaseEntity {
    constructor(amount: number, platform: PlatformEntity, date?: Date) {
        super();
        this.amount = amount;
        this.platform = platform;
        if (date)
            this.date = date;
        else
            this.date = new Date();
    }

    @Column({
        type: 'numeric',
        precision: 10,
        scale: 2,
        transformer: new DecimalTransformer()
    })
        amount: number;

    @Column({ nullable: true })
        date: Date;

    @JoinColumn({ name: 'platform_id' })
    @ManyToOne(() => PlatformEntity, platform => platform.deposits)
        platform: PlatformEntity;
}