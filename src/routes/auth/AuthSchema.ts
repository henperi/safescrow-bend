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
      middleName: Joi.string()
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
}

export default AuthSchema;

// AuthSchema.createUserSchema
