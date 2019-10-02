import * as express from 'express';

/**
 * App
 */
class AppResponse {
  /**
   * @description Success Method
   * @param {express.Response} res Response
   * @param {express.Response} [Response] - The success response object.
   * @param {string=} Response.message - The message.
   * @param {number=} Response.statusCode - The status code.
   * @param {Object<string, any> | Array} [Response.data] - The data.
   *
   * @returns {*} Return
   */
  public static success(
    res: express.Response,
    { message = 'Request Successful', statusCode = 200, data = {} } = {},
  ): void {
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  /**
   * @description Create Method
   * @param {*} res Response
   * @param {Object} [Response] - The success response object.
   * @param {string=} Response.message - The message.
   * @param {number=} Response.statusCode - The status code.
   * @param {Object<string, any> | Array} [Response.data] - The data.
   *
   * @returns {*} Returns
   */
  public static created(
    res: express.Response,
    { message = 'Created Successfully', statusCode = 201, data = {} } = {},
  ): void {
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  /**
   * @description NotFound Method
   * @param {*} res
   * @param {Object} [Response] - The success response object.
   * @param {string=} Response.message - The message.
   * @param {number=} Response.statusCode - The status code.
   * @param {Object<string, any> | Array} [Response.errors] - The data.
   *
   * @returns {*} Return
   */
  public static badRequest(
    res: express.Response,
    { message = 'Bad Request', statusCode = 400, errors = {} } = {},
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * @description unAuthorized Method
   * @param {*} res
   * @param {Object} [Response] - The success response object.
   * @param {string=} Response.message - The message.
   * @param {number=} Response.statusCode - The status code.
   * @param {Object<string, any> | Array} [Response.errors] - The data.
   *
   * @returns {*} Return
   */
  public static unAuthorized(
    res: express.Response,
    { message = 'unAuthorized Request', statusCode = 401, errors = {} } = {},
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * @description NotFound Method
   * @param {*} res
   * @param {Object} [Response] - The success response object.
   * @param {string=} Response.message - The message.
   * @param {number=} Response.statusCode - The status code.
   * @param {Object<string, any> | Array} [Response.errors] - The data.
   *
   * @returns {*} Return
   */
  public static notFound(
    res: express.Response,
    { message = 'Resource not found', statusCode = 404, errors = {} } = {},
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * @description NotFound Method
   * @param {*} res
   * @param {Object} [Response] - The success response object.
   * @param {string=} Response.message - The message.
   * @param {number=} Response.statusCode - The status code.
   * @param {Object<string, any> | Array} [Response.errors] - The data.
   *
   * @returns {*} Return
   */
  public static forbidden(
    res: express.Response,
    { message = 'Request Forbidden', statusCode = 403, errors = {} } = {},
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * @description NotFound Method
   * @param {*} res
   * @param {Object} [Response] - The success response object.
   * @param {string=} Response.message - The message.
   * @param {number=} Response.statusCode - The status code.
   * @param {Object<string, any> | Array} [Response.errors] - The data.
   *
   * @returns {*} Return
   */
  public static conflict(
    res: express.Response,
    { message = 'Conflicting Request', statusCode = 409, errors = {} } = {},
  ): void {
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }

  /**
   * @description NotFound Method
   * @param {*} res
   * @param {Object} [Response] - The success response object.
   * @param {string=} Response.message - The message.
   * @param {number=} Response.statusCode - The status code.
   * @param {Object<string, any> | Array} [Response.errors] - The data.
   *
   * @returns {*} Return
   */
  public static serverError(
    res: express.Response,
    { message = 'An internal error occured', statusCode = 500, errors = {} } = {},
  ): void {
    const getErrors = (): string => {
      if (process.env.NODE_ENV === 'production') {
        return 'This error might be from us, send us a message at info@advertiseit.com if this continues';
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
