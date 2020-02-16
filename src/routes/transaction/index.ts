import * as express from 'express';

// Controllers
import { checkUserAuth } from '../../middlewares/auth';
import { TransactionController } from '../../controllers/TransactionControler';

const transactionRouter = express.Router();

/**
 * Get the authorized user's transaction history
 */
transactionRouter.get('/', checkUserAuth, TransactionController.getAll);

export { transactionRouter };
