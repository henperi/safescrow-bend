/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as Express from 'express';
import UserRepository from '../repositories/UserRepository';
import { AppResponse } from '../helpers/AppResponse';
import { verifyUserToken, validatePasswordResetToken } from '../helpers/tokenHelpers';
import { TokenData } from '../interfaces/TokenHelpers.interface';

const checkUserAuth = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
): Promise<Express.NextFunction | void> => {
  const token = req.headers.authorization;

  if (!token) {
    return AppResponse.badRequest(res, {
      message: 'Authorization header absent, are you logged in?',
    });
  }

  try {
    const decodedToken = verifyUserToken(token) as TokenData;
    const { uniqueId } = decodedToken;

    const user = await UserRepository.getByUniqueId(uniqueId);

    if (!user) {
      return AppResponse.notFound(res, {
        message: 'Unable to grant access to this unique authentication id',
      });
    }

    res.locals.user = { ...decodedToken };

    return next();
  } catch (error) {
    const errorName = error.name;
    let message;

    if (errorName === 'TokenExpiredError' || errorName === 'JsonWebTokenError') {
      message = 'Your authentication token is either invalid or expired';

      return AppResponse.unAuthorized(res, {
        message,
      });
    }

    return AppResponse.serverError(res, { errors: error });
  }
};

/**
 * Method to check a User's existence
 * @param req express request
 * @param res express response
 * @param next express function
 * @returns Promise<void>
 */
const checkUser = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
): Promise<void> => {
  let uniqueId;
  let secretKey;

  try {
    ({ uniqueId, secretKey } = validatePasswordResetToken(req.params.tokenString));
  } catch (errors) {
    return AppResponse.badRequest(res, {
      message: 'Link is either invalid or has expired, request for a new link',
    });
  }

  const user = await UserRepository.getByUniqueIdAndSecretKey(uniqueId!, secretKey!);

  if (!user) {
    return AppResponse.notFound(res, {
      message: `This reset link is either invalid or has been used.`,
    });
  }

  res.locals = { ...res.locals, user };

  return next();
};

export { checkUserAuth, checkUser };
