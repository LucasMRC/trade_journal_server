import { EntityRepository, Repository } from 'typeorm';
import { SymbolEntity } from '../models/symbol.entity';

@EntityRepository(SymbolEntity)
export class SymbolRepository extends Repository<SymbolEntity> {

}
