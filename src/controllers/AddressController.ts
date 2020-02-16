import * as Express from 'express';

import AddressRepository from '../repositories/AddressRepository';
import { AppResponse } from '../helpers/AppResponse';

/**
 * Controller that handles everything relating to address
 */
class AddressController {
  /**
   * Method to create a User's Address
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async createAddress(req: Express.Request, res: Express.Response): Promise<void> {
    const { city, state, line1, line2, landMark, addressType } = req.body;
    const { id } = res.locals.user;

    try {
      const address = await AddressRepository.getByTypeAndUserId({
        userId: id,
        addressType,
      });

      if (address) {
        return AppResponse.conflict(res, { message: `You have a ${addressType} address already` });
      }

      const newAddress = await AddressRepository.create({
        city,
        state,
        line1,
        line2,
        landMark,
        userId: id,
        addressType,
      });

      return AppResponse.created(res, {
        message: `${addressType} address created`,
        data: { newAddress },
      });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default AddressController;
