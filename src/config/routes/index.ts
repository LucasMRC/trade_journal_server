import {
    Application
} from 'express';

// Modules
import { AssetRoutes } from '@modules/asset';
import { SymbolRoutes } from '@modules/symbol';
import { PlatformRoutes } from '@modules/platform';
import { UserRoutes } from '@modules/user';
import { TimeframeRoutes } from '@modules/timeframe';
import { TradeRoutes } from '@modules/trade';
import { BlowUpRoutes } from '@modules/blow_up';
import { OutcomeRoutes } from '@modules/outcome';
import { DepositRoutes } from '@modules/deposit';
import { WithdrawalRoutes } from '@modules/withdrawal';

export default (app: Application) => {
    app.use('/platforms', PlatformRoutes);
    app.use('/users', UserRoutes);
    app.use('/assets', AssetRoutes);
    app.use('/timeframes', TimeframeRoutes);
    app.use('/withdrawals', WithdrawalRoutes);
    app.use('/outcomes', OutcomeRoutes);
    app.use('/blow-ups', BlowUpRoutes);
    app.use('/symbols', SymbolRoutes);
    app.use('/deposits', DepositRoutes);
    app.use('/trades', TradeRoutes);
};