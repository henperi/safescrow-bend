import * as Express from 'express';
import { TokenData } from '../interfaces/TokenHelpers.interface';
import UserRepository from '../repositories/UserRepository';
import { AppResponse } from '../helpers/AppResponse';
import { hashPassword } from '../helpers/passwordHelpers';
import generateUniqueId from '../helpers/generateUniqueId';
import { generateUserToken, setupTokenData } from '../helpers/tokenHelpers';
/**
 * Controller that handles everything relating to auth
 */
class AuthController {
  /**
   * Method to create a User
   * @param req express request
   * @param res express response
   * @returns Promise<void>
   */
  static async createUser(req: Express.Request, res: Express.Response): Promise<void> {
    const { firstName, middleName, lastName, phone, email, password, accountType } = req.body;

    try {
      const user = await UserRepository.getByEmailOrPhone({ email, phone });

      if (user) {
        return AppResponse.conflict(res, { message: 'This email or phone has been taken' });
      }

      const newUser = await UserRepository.create({
        firstName,
        middleName,
        lastName,
        accountType,
        phone,
        email,
        password: hashPassword(password),
        secretKey: `${generateUniqueId()}-${email}`,
      });
      const token = generateUserToken(setupTokenData(newUser as TokenData));

      return AppResponse.created(res, { data: { token } });
    } catch (errors) {
      return AppResponse.serverError(res, { errors });
    }
  }
}

export default AuthController;
