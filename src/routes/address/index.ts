import * as express from 'express';

// Controllers
import { checkUserAuth } from '../../middlewares/auth';
import AddressController from '../../controllers/AddressController';

// Validations
import { validateCreateAddress } from './addressValidation';

const addressRouter = express.Router();

/**
 * Create a user's address
 */
addressRouter.post(
  '/',
  validateCreateAddress,
  checkUserAuth,
  AddressController.createAddress,
);

export { addressRouter };
