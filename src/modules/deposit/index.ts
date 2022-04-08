
import { DepositEntity } from '@modules/deposit/models/deposit.entity';
import { DepositDTO } from '@modules/deposit/models/deposit.dto';
import { DepositRepository } from './repository/deposit.repository';
import { DepositService } from './service/deposit.service';
import DepositRoutes from '@modules/deposit/routes/deposit.routes';

export {
    DepositEntity,
    DepositDTO,
    DepositService,
    DepositRepository,
    DepositRoutes
};