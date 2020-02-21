import * as express from 'express';
import authRouter from './auth';
import { addressRouter } from './address';
import { walletsRouter } from './wallet';
import { transactionRouter } from './transaction';
import { invoiceRouter } from './invoice';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/address', addressRouter);
router.use('/wallet', walletsRouter);
router.use('/transactions', transactionRouter);
router.use('/invoice', invoiceRouter);

export default router;
