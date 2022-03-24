import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { AssetEntity } from '../../asset/models/asset.entity';

@Entity('symbol')
export class SymbolEntity extends BaseEntity {
    constructor(name: string, asset: AssetEntity) {
        super();
        this.name = name;
        this.asset = asset;
    }

    @Column()
        name: string;

    @JoinColumn()
    @OneToOne(() => AssetEntity)
        asset: AssetEntity;
}