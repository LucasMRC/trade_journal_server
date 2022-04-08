import {
    Column,
    Entity,
    JoinColumn,
    OneToOne
} from 'typeorm';
import { BaseEntity } from '@modules/base/base.entity';
import { PlatformEntity } from '@modules/platform';

@Entity('withdrawal')
export class WithdrawalEntity extends BaseEntity {
    constructor(amount: number, platform: PlatformEntity, date?: Date) {
        super();
        this.amount = amount;
        this.platform = platform;
        if (date)
            this.date = date;
        else this.date = new Date();
    }

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
        amount: number;

    @Column({ nullable: true })
        date: Date;

    @JoinColumn({ name: 'platform_id' })
    @OneToOne(() => PlatformEntity)
        platform: PlatformEntity;
}