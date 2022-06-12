import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne
} from 'typeorm';

// Modules
import { BaseEntity } from '@modules/base';
import { AssetEntity } from '@modules/asset/models/asset.entity';

@Entity('symbol')
export class SymbolEntity extends BaseEntity {
    @Column()
        name: string;

    @JoinColumn({ name: 'asset_id' })
    @ManyToOne(() => AssetEntity)
        asset: AssetEntity;
}