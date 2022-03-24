import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@modules/base/base.entity';

@Entity('asset')
export class AssetEntity extends BaseEntity {
    @Column()
        name: string;
}