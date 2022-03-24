import {
    Application
} from 'express';

// Modules
import platformRoutes from '@modules/platform/routes/platform.routes';
import UserRoutes from '@modules/user/routes/user.routes';
import { AssetRoutes } from '@modules/asset';
import TimeframeRoutes from '@modules/timeframe/routes/timeframe.routes';
import TradeRoutes from '@modules/trade/routes/trade.routes';
import { SymbolRoutes } from '@modules/symbol';
import BlowUpRoutes from '@modules/blow_up/routes/blow_up.routes';
import OutcomeRoutes from '@modules/outcome/routes/outcome.routes';
import DepositRoutes from '@modules/deposit/routes/deposit.routes';
import WithdrawalRoutes from '@modules/withdrawal/routes/withdrawal.routes';

export default (app: Application) => {
    app.use('/platforms', platformRoutes);
    app.use('/users', UserRoutes);
    app.use('/assets', AssetRoutes);
    app.use('/timeframes', TimeframeRoutes);
    app.use('/withdrawals', WithdrawalRoutes);
    app.use('/outcomes', OutcomeRoutes);
    app.use('/blowUps', BlowUpRoutes);
    app.use('/symbols', SymbolRoutes);
    app.use('/deposit', DepositRoutes);
    app.use('/trades', TradeRoutes);
};