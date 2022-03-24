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
        createdDate?: Date;

    @Exclude()
    @UpdateDateColumn()
        lastUpdated?: Date;

    @Exclude()
    @DeleteDateColumn()
        deletedAt?: Date;
}
