
import { OutcomeEntity } from './models/outcome.entity';
import { OutcomeDTO } from './models/outcome.dto';
import { OutcomeRepository } from './repository/outcome.repository';
import { OutcomeService } from './service/outcome.service';
import OutcomeRoutes from '@modules/outcome/routes/outcome.routes';

export {
    OutcomeEntity,
    OutcomeService,
    OutcomeRepository,
    OutcomeDTO,
    OutcomeRoutes
};