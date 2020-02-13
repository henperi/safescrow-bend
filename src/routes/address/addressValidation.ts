/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as Express from 'express';

// Route Schemas
import AddressSchema from './AddressSchema';

// Utils | Helpers
import formatJoiErrors from '../../utils/formatJoiErrors';
import { AppResponse } from '../../helpers/AppResponse';

const { createAddressSchema } = AddressSchema;

const validateCreateAddress = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
): Promise<Express.NextFunction | void> => {
  try {
    // @ts-ignore
    await createAddressSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export { validateCreateAddress };
