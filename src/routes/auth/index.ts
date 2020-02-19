import * as express from 'express';

// Controllers
import AuthController from '../../controllers/AuthController';
import { checkUser } from '../../middlewares/auth';

// Validations
import { validateCreateUser, validatePhoneNumber, validate } from './authValidations';
import AuthSchema from './AuthSchema';
import { asyncHandler } from '../../helpers/asyncHandler';

const authRouter = express.Router();

/**
 * Signup user
 */
authRouter.post('/signup', validateCreateUser, validatePhoneNumber, AuthController.createUser);

authRouter.post(
  '/reset-password',
  [validate(AuthSchema.resetPasswordSchema)],
  asyncHandler(AuthController.handlePasswordResetRequest),
);

authRouter.put(
  '/reset-password/:tokenString',
  [validate(AuthSchema.updatePasswordSchema), asyncHandler(checkUser)],
  asyncHandler(AuthController.resetPassword),
);

export default authRouter;
