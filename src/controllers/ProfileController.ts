import * as Express from 'express';

import { ProfileRepository } from '../repositories/ProfileRepository';

import { AppResponse } from '../helpers/AppResponse';
import { trimifyPayload } from '../helpers/trimify';

/**
 * Controller that handles everything relating to address
 */
export class ProfileController {
  /**
   * Method to update a User's Profile
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async editProfile(req: Express.Request, res: Express.Response): Promise<void> {
    const userId = res.locals.user.id as number;

    const newProfile = await ProfileRepository.update(userId, trimifyPayload(req.body));

    return AppResponse.success(res, {
      message: `Your profile has been updated successfully`,
      data: { newProfile },
    });
  }
}
