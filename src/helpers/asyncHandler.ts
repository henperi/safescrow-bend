import * as Express from 'express';
import { AppResponse } from './AppResponse';
import { MiddlwareFunction } from '../interfaces/MiddlewareFunction.interface';

/**
 * Method to create a User
 * @param callbackMiddleware express request
 * @returns Function
 */
const asyncHandler = (callbackMiddleware: MiddlwareFunction) => async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
): Promise<void> => {
  try {
    return await callbackMiddleware(req, res, next);
  } catch (errors) {
    return AppResponse.serverError(res, { errors });
  }
};

export { asyncHandler };
