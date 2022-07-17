import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @CreateDateColumn()
        created_date?: Date;

    @UpdateDateColumn()
        last_updated?: Date;

    @DeleteDateColumn()
        deleted_at?: Date;
}
