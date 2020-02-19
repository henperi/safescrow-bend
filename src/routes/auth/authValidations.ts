/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as Express from 'express';
import * as Joi from '@hapi/joi';

// Route Schemas
import { PhoneHelper } from '../../helpers/PhoneHelper';
import AuthSchema from './AuthSchema';

// Utils | Helpers
import formatJoiErrors from '../../utils/formatJoiErrors';
import { AppResponse } from '../../helpers/AppResponse';

const { createUserSchema } = AuthSchema;

const validate = (validatorSchema: Joi.ObjectSchema) => async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
): Promise<Express.NextFunction | void> => {
  try {
    // @ts-ignore
    await validatorSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

const validateCreateUser = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
): Promise<Express.NextFunction | void> => {
  try {
    // @ts-ignore
    await createUserSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

const validatePhoneNumber = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
): Promise<Express.NextFunction | void> => {
  try {
    await PhoneHelper.isValid(req.body.phone);

    return next();
  } catch (error) {
    return AppResponse.badRequest(res, {
      errors: {
        details: [
          {
            message: 'phone number is not invalid',
            path: 'phone',
          },
        ],
      },
    });
  }
};

export { validateCreateUser, validatePhoneNumber, validate };
