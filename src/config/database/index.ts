import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Modules
import { PlatformEntity } from '@modules/platform/';
import { TimeframeEntity } from '@modules/timeframe';
import { TradeEntity } from '@modules/trade/models/trade.entity';
import { SymbolEntity } from '@modules/symbol';
import { AssetEntity } from '@modules/asset';
import { OutcomeEntity } from '@modules/outcome';
import { WithdrawalEntity } from '@modules/withdrawal';
import { DepositEntity } from '@modules/deposit';
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


