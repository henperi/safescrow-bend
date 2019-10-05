import * as express from 'express';

// Controllers
import AuthController from '../../controllers/AuthController';

// Validations
import { validateCreateUser } from './authValidations';

const authRouter = express.Router();

/**
 * Signup user
 */
authRouter.post('/', validateCreateUser, AuthController.createUser);

export default authRouter;
