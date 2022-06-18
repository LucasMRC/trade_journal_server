import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@modules/base';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column()
        username: string;

    @Exclude()
    @Column()
        hash: string;

    @Column()
        email: string;

    @Column({ default: false })
        picture: string;
}