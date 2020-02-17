import * as express from 'express';
import authRouter from './auth';
import { addressRouter } from './address';
import { walletsRouter } from './wallet';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/address', addressRouter);
router.use('/wallet', walletsRouter);

export default router;
