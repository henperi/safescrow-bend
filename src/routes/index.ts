import * as express from 'express';
import authRouter from './auth';
import { addressRouter } from './address';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/address', addressRouter);

export default router;
