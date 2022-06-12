import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@modules/base';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column()
        username: string;

    @Column()
        hash: string;

    @Column()
        email: string;
}