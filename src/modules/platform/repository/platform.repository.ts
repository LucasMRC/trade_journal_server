import { EntityRepository, Repository } from 'typeorm';
import { PlatformEntity } from '../models/platform.entity';

@EntityRepository(PlatformEntity)
export class PlatformRepository extends Repository<PlatformEntity> {

}
