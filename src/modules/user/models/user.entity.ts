import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column()
        username: string;

    @Column()
        name: string;

    @Column()
        email: string;
}