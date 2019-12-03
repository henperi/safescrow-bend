import * as express from 'express';

// Controllers
import AuthController from '../../controllers/AuthController';

// Validations
import { validateCreateUser, validatePhoneNumber } from './authValidations';

const authRouter = express.Router();

/**
 * Signup user
 */
authRouter.post('/signup', validateCreateUser, validatePhoneNumber, AuthController.createUser);

export default authRouter;
