import {
    Column,
    Entity,
    JoinColumn,
    OneToOne
} from 'typeorm';
import { BaseEntity } from '@modules/base/base.entity';
import { PlatformEntity } from '@modules/platform';
import { DateTransformer, DecimalTransformer } from '@utils/transformers';

@Entity('withdrawal')
export class WithdrawalEntity extends BaseEntity {
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new DecimalTransformer()
    })
        amount: number;

    @Column({
        nullable: true,
        transformer: new DateTransformer()
    })
        date: Date;

    @JoinColumn({ name: 'platform_id' })
    @OneToOne(() => PlatformEntity)
        platform: PlatformEntity;
}