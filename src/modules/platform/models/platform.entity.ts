import { Entity, Column, OneToMany } from 'typeorm';

// Modules
import { BaseEntity } from '@modules/base/base.entity';
import { DepositEntity } from '@modules/deposit/models/deposit.entity';

// Utils
import { DecimalTransformer } from '@utils/transformers';

@Entity('platform')
export class PlatformEntity extends BaseEntity {
    @Column()
        name: string;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2,
        transformer: new DecimalTransformer()
    })
        initial_amount: number;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2,
        transformer: new DecimalTransformer()
    })
        current_amount: number;

    @OneToMany(() => DepositEntity, deposit => deposit.platform)
        deposits: DepositEntity[];
}