// /* eslint-disable require-jsdoc */
import * as Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to address
 */
class AddressSchema {
  /**
   *  Schema used to validate the data relating to creating a users address
   *  @returns createUserSchema
   */
  static get createAddressSchema(): Joi.ObjectSchema {
    return Joi.object({
      city: Joi.string()
        .min(3)
        .max(15)
        .required(),
      state: Joi.string()
        .min(3)
        .max(15)
        .required(),
      line1: Joi.string()
        .min(3)
        .max(150)
        .required(),
      line2: Joi.string()
        .min(3)
        .max(150)
        .optional(),
      landMark: Joi.string()
        .min(3)
        .max(20)
        .optional(),
      addressType: Joi.string()
        .valid('Delivery', 'Home')
        .required(),
    });
  }
}

export default AddressSchema;
