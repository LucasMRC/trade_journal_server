import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { DateTransformer } from '@utils/transformers';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @CreateDateColumn({
        transformer: new DateTransformer(),
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
        created_date?: Date;

    @UpdateDateColumn({
        transformer: new DateTransformer(),
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
        last_updated?: Date;

    @DeleteDateColumn({
        transformer: new DateTransformer(),
        type: 'timestamp',
        nullable: true
    })
        deleted_at?: Date;
}
