// /* eslint-disable require-jsdoc */
import * as Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to auth
 */
export class ProfileSchema {
  /**
   *  Schema used to validate the data relating to editing a user's profile
   *  @returns createUserSchema
   */
  static get editProfileSchema(): Joi.ObjectSchema {
    return Joi.object({
      firstName: Joi.string()
        .min(3)
        .max(15),
      lastName: Joi.string()
        .min(3)
        .max(15),
      gender: Joi.string().valid('Male', 'Female'),
      avatar: Joi.string(),
      bio: Joi.string(),
      dateOfBirth: Joi.date(),
      nationality: Joi.string(),
      stateOfResidence: Joi.string(),
    });
  }
}
