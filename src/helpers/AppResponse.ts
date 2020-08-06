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
    { message = 'Request Successful', data = {} }: SuccessData = {} as SuccessData,
  ): void {
    res.status(200).json({
      success: true,
      statusCode: 200,
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
    { message = 'Created Successfully', data = {} }: SuccessData = {} as SuccessData,
  ): void {
    res.status(201).json({
      success: true,
      statusCode: 201,
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
    { message = 'Bad Request', errors = {} }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(400).json({
      success: false,
      statusCode: 400,
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
    { message = 'Unauthorized Request', errors = {} }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(401).json({
      success: false,
      statusCode: 401,
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
    { message = 'Resource not found', errors = {} }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message,
      errors,
    });
  }

  /**
   * Forbidden Method
   * @param res Res
   *
   * @returns Restful API Response
   */
  public static forbidden(
    res: Express.Response,
    { message = 'Request Forbidden', errors = {} }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(403).json({
      success: false,
      statusCode: 403,
      message,
      errors,
    });
  }

  /**
   * Conflicting Method
   * @param res Res
   *
   * @returns Restful API Response
   */
  public static conflict(
    res: Express.Response,
    { message = 'Conflicting Request', errors = {} }: ErrorsData = {} as ErrorsData,
  ): void {
    res.status(409).json({
      success: false,
      statusCode: 409,
      message,
      errors,
    });
  }

  /**
   * Server Error Method
   * @param res Res
   *
   * @returns Restful API Response
   */
  public static serverError(
    res: Express.Response,
    { message = 'An internal error occured', errors = {} }: ErrorsData = {} as ErrorsData,
  ): void {
    const getErrors = (): string => {
      if (process.env.NODE_ENV === 'production') {
        return 'This error might be from us, send us a message via help@safescrows.com if this continues';
      }

      return errors.toString();
    };

    res.status(500).json({
      success: false,
      statusCode: 500,
      message,
      errors: getErrors(),
    });
  }
}

export { AppResponse };
