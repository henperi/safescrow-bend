// /* eslint-disable require-jsdoc */
import * as Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to auth
 */
class AuthSchema {
  /**
   *  Schema used to validate the data relating to creating a new user
   *  @returns createUserSchema
   */
  static get createUserSchema(): Joi.ObjectSchema {
    return Joi.object({
      firstName: Joi.string()
        .min(3)
        .max(15)
        .required(),
      lastName: Joi.string()
        .min(3)
        .max(15)
        .required(),
      phone: Joi.string()
        .length(11)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      accountType: Joi.string().valid('Customer', 'Merchant'),
    });
  }

  /**
   *  Schema used to validate the data relating to reseting password
   *  @returns resetPasswordSchema
   */
  static get resetPasswordSchema(): Joi.ObjectSchema {
    return Joi.object({
      email: Joi.string()
        .email()
        .required(),
    });
  }

  /**
   *  Schema used to validate the data relating to updating password
   *  @returns updatePasswordSchema
   */
  static get updatePasswordSchema(): Joi.ObjectSchema {
    return Joi.object({
      password: Joi.string().required(),
      passwordRepeat: Joi.ref('password'),
    }).with('password', 'passwordRepeat');
  }

  /**
   *  Schema used to validate the data relating to login a user
   *  @returns loginUserSchema
   */
  static get loginUserSchema(): Joi.ObjectSchema {
    return Joi.object({
      emailOrPhone: Joi.string().required(),
      password: Joi.string().required(),
    }).with('emailOrPassword', 'password');
  }
}

export default AuthSchema;
