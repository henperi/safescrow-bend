import * as Express from 'express';

// Interfaces
import { SuccessData, ErrorsData } from '../interfaces/AppResponse.interface';

/**
 * AppResponse
 */
class AppResponse {
  /**
   * Success Method
   * @param res Response
   *
   * @returns Restful API Response
   */
  public static success(
    res: Express.Response,
    {
      message = 'Request Successful',
      statusCode = 200,
      data = {},
    }: SuccessData = {} as SuccessData,
  ): void {
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  /**
   * Create Method
   * @param res Response
   *
   * @returns Restful API Response
   */
  public static created(
    res: Express.Response,
    {
      message = 'Created Successfully',
      statusCode = 201,
      data = {},
    }: SuccessData = {} as SuccessData,
  ): void {
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  /**
   * NotFound Method
   * @param res Response
   *
   * @returns Restful API Response
   */
  public static badRequest(
    res: Express.Response,
    { message = 'Bad Request', statusCode = 400, errors = {} }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * unAuthorized Method
   * @param res Res
   *
   * @returns Restful API Response
   */
  public static unAuthorized(
    res: Express.Response,
    {
      message = 'Unauthorized Request',
      statusCode = 401,
      errors = {},
    }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * NotFound Method
   * @param res Res
   *
   * @returns Restful API Response
   */
  public static notFound(
    res: Express.Response,
    {
      message = 'Resource not found',
      statusCode = 404,
      errors = {},
    }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * NotFound Method
   * @param res Res
   *
   * @returns Restful API Response
   */
  public static forbidden(
    res: Express.Response,
    { message = 'Request Forbidden', statusCode = 403, errors = {} }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * NotFound Method
   * @param res Res
   *
   * @returns Restful API Response
   */
  public static conflict(
    res: Express.Response,
    {
      message = 'Conflicting Request',
      statusCode = 409,
      errors = {},
    }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * NotFound Method
   * @param res Res
   *
   * @returns Restful API Response
   */
  public static serverError(
    res: Express.Response,
    {
      message = 'An internal error occured',
      statusCode = 500,
      errors = {},
    }: ErrorsData = {} as ErrorsData,
  ): void {
    const getErrors = (): string => {
      if (process.env.NODE_ENV === 'production') {
        return 'This error might be from us, send us a message via help@safescrows.com if this continues';
      }
      console.log(errors);

      return errors.toString();
    };

    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors: getErrors(),
    });
  }
}

export { AppResponse };
