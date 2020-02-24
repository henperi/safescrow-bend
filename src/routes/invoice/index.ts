import * as express from 'express';

// Controllers
import InvoiceController from '../../controllers/InvoiceController';

// Validations
import InvoiceSchema, { invoiceTotalValidator } from './invoiceValidation';

import { validate } from '../auth/authValidations';

// AsyncHandler
import { asyncHandler } from '../../helpers/asyncHandler';

// Middleware

import { checkUserAuth, checkUserIsMerchant } from '../../middlewares/auth';

const invoiceRouter = express.Router();

/**
 * Create invoice
 */
invoiceRouter.post(
  '/',
  [
    checkUserAuth,
    checkUserIsMerchant,
    validate(InvoiceSchema.createInvoiceSchema),
    invoiceTotalValidator,
  ],
  asyncHandler(InvoiceController.createInvoice),
);

export { invoiceRouter };
