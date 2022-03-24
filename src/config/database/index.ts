import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Modules
import { PlatformEntity } from '@modules/platform/models/platform.entity';
import { TimeframeEntity } from '@modules/timeframe/models/timeframe.entity';
import { TradeEntity } from '@modules/trade/models/trade.entity';
import { SymbolEntity } from '@modules/symbol';
import { AssetEntity } from '@modules/asset';
import { OutcomeEntity } from '@modules/outcome/models/outcome.entity';
import { WithdrawalEntity } from '@modules/withdrawal/models/withdrawal.entity';
import { DepositEntity } from '@modules/deposit/models/deposit.entity';
import { BlowUpEntity } from '@modules/blow_up/models/blow_up.entity';
import { UserEntity } from '@modules/user/models/user.entity';

export const connectionConfig: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
        PlatformEntity,
        TimeframeEntity,
        TradeEntity,
        SymbolEntity,
        AssetEntity,
        OutcomeEntity,
        WithdrawalEntity,
        DepositEntity,
        BlowUpEntity,
        UserEntity
    ],
    synchronize: false,
    dropSchema: false
};


