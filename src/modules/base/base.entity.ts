import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Exclude()
    @CreateDateColumn()
        created_date?: Date;

    @Exclude()
    @UpdateDateColumn()
        last_updated?: Date;

    @Exclude()
    @DeleteDateColumn()
        deleted_at?: Date;
}
