import * as express from 'express';

// Controllers
import { WalletController } from '../../controllers/WalletController';

// Middlewares
import { checkUserAuth } from '../../middlewares/auth';

const walletsRouter = express.Router();

/**
 * Fetch the authorized user's Wallet (mainWallet and EscrowWallet)
 */
walletsRouter.get('/', checkUserAuth, WalletController.getWallets);

export { walletsRouter };
